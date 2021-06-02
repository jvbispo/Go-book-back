import Book from '../entities/Book';

export default interface IFindDTO {
  books: Book[];
  count: number;
}
