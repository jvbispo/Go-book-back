import { injectable, inject } from 'tsyringe';
import { format } from 'date-fns';
import IClientRepository from '../dtos/IClientRepository';
import IUpdateClient from '../dtos/IUpdateClient';
import IParsedClient from '../dtos/IParsedClient';

@injectable()
class UpdateClient {
  constructor(
    @inject('ClientRepository')
    private clientRepository: IClientRepository,
  ) {}

  public async execute({
    id,
    nome,
    email,
    dataDeNascimento,
  }: IUpdateClient): Promise<IParsedClient> {
    const client = await this.clientRepository.findOne(id);

    if (!client) throw new Error('client does not exists');

    if (nome) client.nome = nome;
    if (email) client.email = email;
    if (dataDeNascimento) client.dataDeNascimento = dataDeNascimento;

    await this.clientRepository.save(client);

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

export default UpdateClient;
