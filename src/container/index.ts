import { container } from 'tsyringe';
import IClientRepository from '../dtos/IClientRepository';
import ClientRepository from '../repositories/ClientRepository';

container.registerSingleton<IClientRepository>(
  'ClientRepository',
  ClientRepository,
);
