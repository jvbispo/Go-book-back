import FakeClientRepository from '../repositories/FakeClientsRepository';
import CreateClientService from './CreateClientService';

let fakeClientRepository: FakeClientRepository;
let createClientService: CreateClientService;

// eslint-disable-next-line no-undef
describe('CreateClient', () => {
  beforeEach(() => {
    fakeClientRepository = new FakeClientRepository();
    createClientService = new CreateClientService(fakeClientRepository);
  });

  it('should be able to create a client', async () => {
    const client = await createClientService.execute({
      nome: 'joao',
      email: 'joao@teste.com',
      dataDeNascimento: new Date(1997, 8, 12, 0, 0),
    });

    expect(client).toHaveProperty('nome');
    expect(client).toHaveProperty('email');
    expect(client.dataDeNascimento).toBeInstanceOf(Date);
  });

  it('should not be able to create a client with an existing client email', async () => {
    await createClientService.execute({
      nome: 'joao',
      email: 'joao@teste.com',
      dataDeNascimento: new Date(1997, 8, 12, 0, 0),
    });

    await expect(
      createClientService.execute({
        nome: 'joao',
        email: 'joao@teste.com',
        dataDeNascimento: new Date(1997, 8, 12, 0, 0),
      }),
    ).rejects.toBeInstanceOf(Error);
  });
});
