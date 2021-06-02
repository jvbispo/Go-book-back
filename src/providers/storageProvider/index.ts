import { container } from 'tsyringe';
import upload from '../../config/upload';
import DiskStorageProvider from './fakes/FakeDiskStorageProvider';
import IStorageProvider from './models/IStorageProvider';

const providers = {
  DISK: DiskStorageProvider,
};

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  providers[upload.driver],
);
