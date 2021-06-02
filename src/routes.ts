import { Router } from 'express';
import multer from 'multer';
import uploadConfig from './config/upload';
import BookController from './controllers/BookController';

const bookController = new BookController();
const routes = Router();
const upload = multer(uploadConfig.config.disk);

routes.post('/book',  upload.single('avatar'),bookController.post);

routes.get('/books', bookController.index);

routes.get('/book/:id', bookController.show);

export default routes;
