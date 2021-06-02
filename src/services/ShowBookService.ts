import { injectable, inject } from 'tsyringe';
import IBookRepository from '../dtos/IBookRepository';
import IParsedBook from '../dtos/IParsedBook';

@injectable()
class IndexBookService {
  constructor(
    @inject('BookRepository')
    private bookRepository: IBookRepository,
  ) {}

  public async execute(id: string): Promise<IParsedBook> {
    const book = await this.bookRepository.findOne(id);
    if (!book) {
      throw new Error('book was not found');
    }
    return book;
  }
}

export default IndexBookService;
