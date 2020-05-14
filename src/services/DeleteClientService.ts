import { injectable, inject } from 'tsyringe';
import IClientRepository from '../dtos/IClientRepository';

@injectable()
class DeletePostService {
  constructor(
    @inject('ClientRepository')
    private clientRepository: IClientRepository,
  ) {}

  async execute(id: number): Promise<void> {
    const client = await this.clientRepository.findOne(id);

    if (!client) {
      throw new Error('client was not found!');
    }

    await this.clientRepository.delete(id);
  }
}

export default DeletePostService;
