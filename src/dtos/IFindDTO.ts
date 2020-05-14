import Client from '../entities/Client';

export default interface IFindDTO {
  clients: Client[];
  count: number;
}
