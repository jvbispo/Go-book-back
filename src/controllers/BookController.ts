import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateBookService from '../services/CreateBookService';
import IndexBookService from '../services/IndexBookService';
import ShowBookService from '../services/ShowBookService';

class BookController {
  public async show(req: Request, res: Response): Promise<Response> {
    try {
      const showBookService = container.resolve(ShowBookService);

      const { id } = req.params;

      const book = await showBookService.execute(id);
      if (!book) {
        throw new Error('book was not found');
      }

      return res.json(classToClass(book));
    } catch (err) {
      return res.json({ error: err.message });
    }
  }

  public async index(req: Request, res: Response): Promise<Response> {
    try {
      const indexBookService = container.resolve(IndexBookService);
      const { pagina, limite } = req.query;
      const parsedPagina = Number(pagina);
      const parsedLimite = Number(limite);
      const books = await indexBookService.execute({
        pagina: parsedPagina,
        limite: parsedLimite,
      });

      return res.json(books);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  public async post(req: Request, res: Response): Promise<Response> {
    try {
      const createBookService = container.resolve(CreateBookService);
      const { title, subtitle, description, author} = req.body;
      const coverPicture  = req?.file?.filename ?? '';
      const book = await createBookService.execute({
        title,
        author,
        description,
        subtitle,
        coverPicture,
      });

      return res.json(classToClass(book));
    } catch (err) {
      console.log(err);
      return res.status(400).send(err.message);
    }
  }
}

export default BookController;
