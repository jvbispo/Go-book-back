import FakeClientRepository from '../repositories/FakeClientsRepository';
import CreateClientService from './CreateClientService';
import DeleteClientService from './DeleteClientService';

let fakeClientRepository: FakeClientRepository;
let createClientService: CreateClientService;
let deleteClientService: DeleteClientService;

describe('DeleteClient', () => {
  beforeEach(() => {
    fakeClientRepository = new FakeClientRepository();
    createClientService = new CreateClientService(fakeClientRepository);
    deleteClientService = new DeleteClientService(fakeClientRepository);
  });

  it('should be able to delete a client', async () => {
    const client = await createClientService.execute({
      nome: 'joao',
      email: 'joao@teste.com',
      dataDeNascimento: new Date(1997, 8, 12, 0, 0),
    });

    const deleteclientMethod = jest.spyOn(fakeClientRepository, 'delete');

    await deleteClientService.execute(client.id);

    expect(deleteclientMethod).toHaveBeenCalled();
  });

  it('should not be able to delete a client with a non-existing ID', async () => {
    await expect(deleteClientService.execute(1234)).rejects.toBeInstanceOf(
      Error,
    );
  });
});
