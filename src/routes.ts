import { Router } from 'express';

import ClientController from './controllers/ClientController';

const clientController = new ClientController();
const routes = Router();

routes.post('/cliente', clientController.post);

routes.get('/cliente', clientController.index);

routes.get('/cliente/:id', clientController.show);

routes.delete('/cliente/:id', clientController.delete);

routes.put('/cliente/:id', clientController.update);

export default routes;
