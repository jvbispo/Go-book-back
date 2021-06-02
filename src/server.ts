import 'reflect-metadata';
import 'dotenv/config';
import express from 'express';
import routes from './routes';
import './database/index';
import './container/index';
import cors from 'cors';
import {resolve} from 'path';
import swaggerUi from 'swagger-ui-express';
import swaggerFile from './swagger.json';

const app = express();

app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile))
app.use(cors());
app.use(routes);
app.use('/files', express.static(resolve(__dirname, '..', 'tmp', 'uploads')));
app.listen(3333, () => {
  console.log('server running on port', 3333);
});
