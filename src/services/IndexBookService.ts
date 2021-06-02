import { inject, injectable } from 'tsyringe';
import IBookRepository from '../dtos/IBookRepository';
import IParsedBook from '../dtos/IParsedBook';
import IIndexDTO from '../dtos/IIndexDTO';
import Book from '../entities/Book';
import { classToClass } from 'class-transformer';

interface IResponse {
  total: number;
  books: IParsedBook[];
}

@injectable()
class IndexBookSerivce {
  constructor(
    @inject('BookRepository')
    private bookRepository: IBookRepository,
  ) {}

  public async execute({ pagina, limite }: IIndexDTO): Promise<IResponse> {
    const { books, count } = await this.bookRepository.find({
      pagina,
      limite,
    });
    const parsedBooks: IParsedBook[] = [];
    books.forEach(book => {
      book = classToClass(book)
      parsedBooks.push(book);
    });
    return { total: count, books: parsedBooks };
  }
}

export default IndexBookSerivce;
