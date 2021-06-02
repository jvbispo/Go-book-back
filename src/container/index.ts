import { container } from 'tsyringe';
import IBookRepository from '../dtos/IBookRepository';
import DiskStorageProvider from '../providers/storageProvider/implementations/DiskStorageProvider';
import IStorageProvider from '../providers/storageProvider/models/IStorageProvider';
import BookRepository from '../repositories/BookRepository';



container.registerSingleton<IBookRepository>('BookRepository', BookRepository);

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  DiskStorageProvider
);
