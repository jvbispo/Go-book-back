import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateClientService from '../services/CreateClientService';
import DeleteClientService from '../services/DeleteClientService';
import UpdateClientService from '../services/UpdateClientService';
import IndexClientService from '../services/IndexClientService';
import ShowClientService from '../services/ShowClientService';

class ClientController {
  public async show(req: Request, res: Response): Promise<Response> {
    try {
      const showClientService = container.resolve(ShowClientService);

      const { id } = req.params;

      const client = await showClientService.execute(parseInt(id, 10));
      if (!client) {
        throw new Error('client was not found');
      }

      return res.json(client);
    } catch (err) {
      return res.json({ error: err.message });
    }
  }

  public async index(req: Request, res: Response): Promise<Response> {
    try {
      const indexClientService = container.resolve(IndexClientService);
      const { pagina, limite } = req.query;
      const parsedPagina = Number(pagina);
      const parsedLimite = Number(limite);
      const clients = await indexClientService.execute({
        pagina: parsedPagina,
        limite: parsedLimite,
      });
      return res.json(clients);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  public async post(req: Request, res: Response): Promise<Response> {
    try {
      const createClientService = container.resolve(CreateClientService);
      const { nome, email, dataDeNascimento } = req.body;
      const [dia, mes, ano] = dataDeNascimento.split('/');

      const parsedDate = new Date(
        Number(ano),
        Number(mes) - 1,
        Number(dia),
        0,
        0,
      );
      const client = await createClientService.execute({
        nome,
        email,
        dataDeNascimento: parsedDate,
      });

      client.dataDeNascimento = dataDeNascimento;

      return res.json(client);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  public async update(req: Request, res: Response): Promise<Response> {
    try {
      const updateClientService = container.resolve(UpdateClientService);
      const { nome, email, dataDeNascimento } = req.body;
      const { id } = req.params;

      const intId = parseInt(id, 10);

      const client = await updateClientService.execute({
        id: intId,
        nome,
        email,
        dataDeNascimento,
      });

      return res.json(client);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;

      const deleteClientService = container.resolve(DeleteClientService);

      await deleteClientService.execute(parseInt(id, 10));

      return res.send();
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }
}

export default ClientController;
