import { format } from 'date-fns';
import { injectable, inject } from 'tsyringe';
import IClientRepository from '../dtos/IClientRepository';
import IParsedClient from '../dtos/IParsedClient';

@injectable()
class IndexClientSerivce {
  constructor(
    @inject('ClientRepository')
    private clientRepository: IClientRepository,
  ) {}

  public async execute(id: number): Promise<IParsedClient> {
    const client = await this.clientRepository.findOne(id);
    if (!client) {
      throw new Error('client was not found');
    }
    const parsedDate = format(client.dataDeNascimento, 'dd/MM/yyyy');

    const newClient = {
      id: client.id,
      nome: client.nome,
      email: client.email,
      dataDeNascimento: parsedDate,
    };

    return newClient;
  }
}

export default IndexClientSerivce;
