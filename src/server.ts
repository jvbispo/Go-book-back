import 'reflect-metadata';
import express from 'express';
import routes from './routes';
import './database/index';
import './container/index';

const app = express();

app.use(express.json());
app.use(routes);

app.listen(3333, () => {
  console.log('servidor está rodando');
});
