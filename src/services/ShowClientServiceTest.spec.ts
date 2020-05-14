import FakeClientRepository from '../repositories/FakeClientsRepository';
import CreateClientService from './CreateClientService';
import ShowClientService from './ShowClientService';

let fakeClientRepository: FakeClientRepository;
let createClientService: CreateClientService;
let showClientService: ShowClientService;

describe('DeleteClient', () => {
  beforeEach(() => {
    fakeClientRepository = new FakeClientRepository();
    createClientService = new CreateClientService(fakeClientRepository);
    showClientService = new ShowClientService(fakeClientRepository);
  });

  it('should be able to show a client passing client id', async () => {
    const client = await createClientService.execute({
      nome: 'joao',
      email: 'joao@teste.com',
      dataDeNascimento: new Date(1997, 8, 12, 0, 0),
    });

    const clientRequested = await showClientService.execute(client.id);

    expect(clientRequested.id).toBe(client.id);
  });

  it('should be able to show a client passing client id', async () => {
    await expect(showClientService.execute(12452)).rejects.toBeInstanceOf(
      Error,
    );
  });
});
