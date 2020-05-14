import Client from '../entities/Client';
import ICreateClient from './ICreateClient';
import IIndexDTO from './IIndexDTO';
import IFindDTO from './IFindDTO';

export default interface IClientRepository {
  create(data: ICreateClient): Promise<Client>;
  save(client: Client): Promise<void>;
  delete(id: number): Promise<void>;
  find(data: IIndexDTO): Promise<IFindDTO>;
  findOne(id: number): Promise<Client | undefined>;
  findByEmail(email: string): Promise<Client | undefined>;
}
