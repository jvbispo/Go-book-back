import FakeClientRepository from '../repositories/FakeClientsRepository';
import CreateClientService from './CreateClientService';
import UpdateclientService from './UpdateClientService';

let fakeClientRepository: FakeClientRepository;
let createClientService: CreateClientService;
let updateClientService: UpdateclientService;

describe('CreateClient', () => {
  beforeEach(() => {
    fakeClientRepository = new FakeClientRepository();
    createClientService = new CreateClientService(fakeClientRepository);
    updateClientService = new UpdateclientService(fakeClientRepository);
  });

  it('should be able to update a client', async () => {
    const client = await createClientService.execute({
      nome: 'joao',
      email: 'joao@teste.com',
      dataDeNascimento: new Date(1997, 8, 12, 0, 0),
    });

    const updatedClient = await updateClientService.execute({
      id: client.id,
      nome: 'felipe',
      email: 'felipe@teste.com',
      dataDeNascimento: new Date(1997, 9, 12, 0, 0),
    });

    expect(updatedClient.nome).toBe('felipe');
    expect(updatedClient.email).toBe('felipe@teste.com');
    expect(updatedClient.dataDeNascimento).toBe('12/10/1997');
  });

  it('should not be able to update a client with a non existing id', async () => {
    expect(
      updateClientService.execute({
        id: 12345767,
        nome: 'joao',
        email: 'joao@teste.com',
        dataDeNascimento: new Date(1997, 8, 12, 0, 0),
      }),
    ).rejects.toBeInstanceOf(Error);
  });
});
