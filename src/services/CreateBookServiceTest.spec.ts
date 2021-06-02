import FakeDiskStorageProvider from '../providers/storageProvider/fakes/FakeDiskStorageProvider';
import FakeBookRepository from '../repositories/FakeBookRepository';
import CreateBookService from './CreateBookService';

let fakeBookRepository: FakeBookRepository;
let createBookService: CreateBookService;
let diskStorageProvider: FakeDiskStorageProvider;

describe('CreateBookService', () => {
  beforeEach(() => {
    fakeBookRepository = new FakeBookRepository();
    diskStorageProvider = new FakeDiskStorageProvider();
    createBookService = new CreateBookService(fakeBookRepository, diskStorageProvider);
  });

  it('should be able to create a book', async () => {
    const book = await createBookService.execute({
      title: 'any title',
      subtitle: 'any subtitle',
      author: 'any author',
      description: 'any description',
      coverPicture: 'any cover picture',
    });

    expect(book.title).toBe('any title');
    expect(book.subtitle).toBe('any subtitle');
    expect(book.author).toBe('any author');
    expect(book.description).toBe('any description');
    expect(book.coverPicture).toBe('any cover picture');
  });

  it('should not be able to create a book with an existing book title', async () => {

    try {
      await createBookService.execute({
        title: 'any title',
        subtitle: 'any subtitle',
        author: 'any author',
        description: 'any description',
        coverPicture: 'any cover picture',
      });
    } catch(err) {
      expect(err.message).toBe('book already already exists')
    }

  });
});
