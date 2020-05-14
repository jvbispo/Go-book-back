import Client from '../entities/Client';
import IClientRepository from '../dtos/IClientRepository';
import ICreateClientInterface from '../dtos/ICreateClient';
import IIndexDTO from '../dtos/IIndexDTO';
import IFindDTO from '../dtos/IFindDTO';

class ClientRepository implements IClientRepository {
  private clients: Client[] = [];

  async create({
    nome,
    email,
    dataDeNascimento,
  }: ICreateClientInterface): Promise<Client> {
    const id = this.clients.length;
    const client = new Client();
    client.nome = nome;
    client.email = email;
    client.id = id;
    client.dataDeNascimento = dataDeNascimento;

    await this.save(client);
    return client;
  }

  async find({ pagina = 1, limite = 10 }: IIndexDTO): Promise<IFindDTO> {
    const count = this.clients.length;
    return { clients: this.clients, count };
  }

  async findOne(id: number): Promise<Client | undefined> {
    const findClient = this.clients.findIndex(client => client.id === id);
    const client = this.clients[findClient];

    return client;
  }

  async findByEmail(email: string): Promise<Client | undefined> {
    const findClient = this.clients.findIndex(client => client.email === email);
    return this.clients[findClient];
  }

  async save(client: Client): Promise<void> {
    const clientIndex = this.clients.findIndex(
      findClient => findClient.id === client.id,
    );

    this.clients[clientIndex] = client;
  }

  async delete(id: number): Promise<void> {
    const clientIndex = this.clients.findIndex(client => client.id === id);

    this.clients.splice(clientIndex, 1);
  }
}

export default ClientRepository;
