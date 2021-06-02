import FakeDiskStorageProvider from '../providers/storageProvider/fakes/FakeDiskStorageProvider';
import FakeBookRepository from '../repositories/FakeBookRepository';
import CreateBookService from './CreateBookService';
import ShowBookService from './ShowBookService';

let fakeBookRepository: FakeBookRepository;
let createBookService: CreateBookService;
let showBookService: ShowBookService;
let diskStorageProvider: FakeDiskStorageProvider;

describe('ShowBookService', () => {
  beforeEach(() => {
    fakeBookRepository = new FakeBookRepository();
    diskStorageProvider = new FakeDiskStorageProvider();
    createBookService = new CreateBookService(fakeBookRepository, diskStorageProvider);
    showBookService = new ShowBookService(fakeBookRepository);
  });

  it('should be able to show a book passing book id', async () => {
    const book = await createBookService.execute({
      title: 'any title',
      subtitle: 'any subtitle',
      author: 'any author',
      description: 'any description',
      coverPicture: 'any cover picture',
    });

    const bookRequested = await showBookService.execute(book.id);

    expect(bookRequested.id).toBe(book.id);
  });

  it('should be able to show a book passing book id', async () => {
    try {
      await showBookService.execute('abc');
    } catch (err) {
      expect(err.message).toBe('book was not found')
    }
  });
});
