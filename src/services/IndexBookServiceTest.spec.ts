import FakeDiskStorageProvider from '../providers/storageProvider/fakes/FakeDiskStorageProvider';
import FakeBookRepository from '../repositories/FakeBookRepository';
import CreateBookService from './CreateBookService';
import IndexBookService from './IndexBookService';

let fakeBookRepository: FakeBookRepository;
let createBookService: CreateBookService;
let indexBookService: IndexBookService;
let diskStorageProvider: FakeDiskStorageProvider;

describe('IndexBookService', () => {
  beforeEach(() => {
    fakeBookRepository = new FakeBookRepository();
    diskStorageProvider = new FakeDiskStorageProvider();
    createBookService = new CreateBookService(fakeBookRepository, diskStorageProvider);
    indexBookService = new IndexBookService(fakeBookRepository);
  });

  afterEach(() => {

  });

  it('should be able to index all books', async () => {
    await createBookService.execute({
      title: 'any title 5',
      subtitle: 'any subtitle',
      author: 'any author',
      description: 'any description',
      coverPicture: 'any cover picture',
    });

    await createBookService.execute({
      title: 'any title 6',
      subtitle: 'any subtitle 2',
      author: 'any author 2',
      description: 'any description 2',
      coverPicture: 'any cover picture 2',
    });


    const booksResult = await indexBookService.execute({
      pagina: 1,
      limite: 10,
    });

    expect(booksResult.total).toBe(2);
  });
});
