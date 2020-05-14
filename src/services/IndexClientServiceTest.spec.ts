import FakeClientRepository from '../repositories/FakeClientsRepository';
import CreateClientService from './CreateClientService';
import IndexClientService from './IndexClientService';

let fakeClientRepository: FakeClientRepository;
let createClientService: CreateClientService;
let indexClientService: IndexClientService;

describe('DeleteClient', () => {
  beforeEach(() => {
    fakeClientRepository = new FakeClientRepository();
    createClientService = new CreateClientService(fakeClientRepository);
    indexClientService = new IndexClientService(fakeClientRepository);
  });

  it('should be able to index all clients', async () => {
    await createClientService.execute({
      nome: 'joao',
      email: 'joao@teste.com',
      dataDeNascimento: new Date(1997, 8, 12, 0, 0),
    });

    const indexClientMethod = jest.spyOn(fakeClientRepository, 'find');

    await indexClientService.execute({ pagina: 1, limite: 10 });

    expect(indexClientMethod).toHaveBeenCalled();
  });
});
