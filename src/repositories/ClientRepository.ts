import { Repository, getRepository } from 'typeorm';
import Client from '../entities/Client';
import IClientRepository from '../dtos/IClientRepository';
import ICreateClientInterface from '../dtos/ICreateClient';
import IIndexDTO from '../dtos/IIndexDTO';
import IFindDTO from '../dtos/IFindDTO';

class ClientRepository implements IClientRepository {
  private ormRepository: Repository<Client>;

  constructor() {
    this.ormRepository = getRepository(Client);
  }

  async create({
    nome,
    email,
    dataDeNascimento,
  }: ICreateClientInterface): Promise<Client> {
    const client = this.ormRepository.create({
      nome,
      email,
      dataDeNascimento,
    });

    await this.save(client);

    return client;
  }

  async find({ pagina = 1, limite = 10 }: IIndexDTO): Promise<IFindDTO> {
    let pag: number;
    let lim: number;
    if (pagina) pag = pagina;
    else pag = 1;

    if (limite) lim = limite;
    else lim = 10;

    const offset = (pag - 1) * lim;
    const clients = await this.ormRepository.find({ skip: offset, take: lim });

    const [, count] = await this.ormRepository.findAndCount();

    return { clients, count };
  }

  async findOne(id: number): Promise<Client | undefined> {
    const client = await this.ormRepository.findOne(id);

    return client;
  }

  async findByEmail(email: string): Promise<Client | undefined> {
    const client = await this.ormRepository.findOne({ where: { email } });

    return client;
  }

  async save(client: Client): Promise<void> {
    await this.ormRepository.save(client);
  }

  async delete(id: number): Promise<void> {
    const client = await this.ormRepository.findOne(id);
    if (client) {
      await this.ormRepository.remove(client);
    }
  }
}

export default ClientRepository;
