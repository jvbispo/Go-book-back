import Book from '../entities/Book';
import IBookRepository from '../dtos/IBookRepository';
import ICreateBookInterface from '../dtos/ICreateBook';
import IIndexDTO from '../dtos/IIndexDTO';
import IFindDTO from '../dtos/IFindDTO';

class FakeBookRepository implements IBookRepository {
  private books: Book[] = [];

  async create({
    title,
    subtitle,
    description,
    author,
    coverPicture,
  }: ICreateBookInterface): Promise<Book> {
    const id = this.books.length;
    const book = new Book();
    book.title = title;
    book.subtitle = subtitle;
    book.id = `${id}`;
    book.description = description;
    book.author = author;
    book.coverPicture = coverPicture || '';

    await this.save(book);
    return book;
  }

  async find({ pagina = 1, limite = 10 }: IIndexDTO): Promise<IFindDTO> {
    const count = this.books.length;
    return { books: this.books || [], count };
  }

  async findOne(id: string): Promise<Book | undefined> {
    const findBook = this.books.find(book => book.id === id);
    return findBook;
  }

  async findByTitle(title: string): Promise<Book | undefined> {
    const findBook = this.books.find(book => book.title === title);
    return findBook;
  }

  async save(book: Book): Promise<void> {
    const bookIndex = this.books.findIndex(findBook => findBook.id === book.id);
    if (bookIndex >= 0) {
      this.books[bookIndex] = book;
    } else {
      this.books.push(book);
    }
  }
}

export default FakeBookRepository;
