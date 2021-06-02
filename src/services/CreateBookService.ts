import { injectable, inject } from 'tsyringe';
import Book from '../entities/Book';
import IBookRepository from '../dtos/IBookRepository';
import ICreateBook from '../dtos/ICreateBook';
import IStorageProvider from '../providers/storageProvider/models/IStorageProvider';

@injectable()
class UpdateAvatarService {
  constructor(
    @inject('BookRepository')
    private bookRepository: IBookRepository,
    @inject('StorageProvider')
    private diskStorageProvider: IStorageProvider
  ) {}

  public async execute({
    author,
    description,
    subtitle,
    title,
    coverPicture,
  }: ICreateBook): Promise<Book> {
    const isBook = await this.bookRepository.findByTitle(title);
    if (isBook) throw new Error('book already exists');

    const fileName = await this.diskStorageProvider.saveFile(coverPicture);
    const book = await this.bookRepository.create({
      title,
      description,
      subtitle,
      author,
      coverPicture: fileName,
    });
    return book;
  }


}

export default UpdateAvatarService;
