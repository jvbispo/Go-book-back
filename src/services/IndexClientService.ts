import { format } from 'date-fns';
import { inject, injectable } from 'tsyringe';
import IClientRepository from '../dtos/IClientRepository';
import IParsedClient from '../dtos/IParsedClient';
import IIndexDTO from '../dtos/IIndexDTO';

interface IResponse {
  total: number;
  clients: IParsedClient[];
}

@injectable()
class IndexClientSerivce {
  constructor(
    @inject('ClientRepository')
    private clientRepository: IClientRepository,
  ) {}

  public async execute({ pagina, limite }: IIndexDTO): Promise<IResponse> {
    const { clients, count } = await this.clientRepository.find({
      pagina,
      limite,
    });
    const parsedClients: IParsedClient[] = [];
    clients.forEach(client => {
      const parsedDate = format(client.dataDeNascimento, 'dd/MM/yyyy');

      const newClient = {
        id: client.id,
        nome: client.nome,
        email: client.email,
        dataDeNascimento: parsedDate,
      };

      parsedClients.push(newClient);
    });
    return { total: count, clients: parsedClients };
  }
}

export default IndexClientSerivce;
