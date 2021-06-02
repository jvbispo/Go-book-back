import Book from '../entities/Book';
import ICreateBook from './ICreateBook';
import IIndexDTO from './IIndexDTO';
import IFindDTO from './IFindDTO';

export default interface IBookRepository {
  create(data: ICreateBook): Promise<Book>;
  save(book: Book): Promise<void>;
  find(data: IIndexDTO): Promise<IFindDTO>;
  findOne(id: string): Promise<Book | undefined>;
  findByTitle(title: string): Promise<Book | undefined>;
}
