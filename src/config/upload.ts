import multer, { StorageEngine } from 'multer';
import { resolve } from 'path';
import crypto from 'crypto';

const tmpFolder = resolve(__dirname, '..', '..', 'tmp');

interface IUploadConfig {
  driver: 'DISK';
  directory: string;
  uploadDirectory: string;
  config: {
    disk: {
      storage: StorageEngine;
    };
  };
}
export default {
  driver: process.env.STORAGE_DRIVER,
  directory: tmpFolder,
  uploadDirectory: resolve(tmpFolder, 'uploads'),

  config: {
    disk: {
      storage: multer.diskStorage({
        destination: tmpFolder,
        filename(request, file, callback) {
          const fileHash = crypto.randomBytes(10).toString('hex');
          const fileName = `${fileHash}-${file.originalname}`;

          return callback(null, fileName);
        },
      }),
    },
  },
} as IUploadConfig;
