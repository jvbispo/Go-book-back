import { Repository, getRepository } from 'typeorm';
import Book from '../entities/Book';
import IBookRepository from '../dtos/IBookRepository';
import ICreateInterface from '../dtos/ICreateBook';
import IIndexDTO from '../dtos/IIndexDTO';
import IFindDTO from '../dtos/IFindDTO';

class BookRepository implements IBookRepository {
  private ormRepository: Repository<Book>;

  constructor() {
    this.ormRepository = getRepository(Book);
  }

  async create({
    title,
    author,
    description,
    subtitle,
    coverPicture,
  }: ICreateInterface): Promise<Book> {
    const book = this.ormRepository.create({
      title,
      author,
      subtitle,
      description,
      coverPicture,
    });

    await this.save(book);

    return book;
  }

  async find({ pagina = 1, limite = 10 }: IIndexDTO): Promise<IFindDTO> {
    let pag: number;
    let lim: number;
    if (pagina) pag = pagina;
    else pag = 1;

    if (limite) lim = limite;
    else lim = 10;

    const offset = (pag - 1) * lim;
    const books = await this.ormRepository.find({ skip: offset, take: lim });

    const [, count] = await this.ormRepository.findAndCount();

    return { books, count };
  }

  async findOne(id: string): Promise<Book | undefined> {
    const book = await this.ormRepository.findOne(id);

    return book;
  }

  async findByTitle(title: string): Promise<Book | undefined> {
    const book = await this.ormRepository.findOne({ where: { title } });

    return book;
  }

  async save(book: Book): Promise<void> {
    await this.ormRepository.save(book);
  }
}

export default BookRepository;
