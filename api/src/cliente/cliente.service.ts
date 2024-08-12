import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Cliente } from './cliente.entity';
import { ClienteSalvarDto } from './dto/cliente.salvar.dto';
import { ResultadoDto } from 'src/dto/resultado.dto';

@Injectable()
export class ClienteService {
  constructor(
    @Inject('CLIENTE_REPOSITORY')
    private clienteRepository: Repository<Cliente>,
  ) { }

  async getCliente(): Promise<Cliente[]> {
    return this.clienteRepository.find({
      where: [
        { removido: 0 }
      ]
    });
  }

  async getClienteById(id: number): Promise<Cliente | null> {
    return this.clienteRepository.findOneBy({ id });
  }

  async salvarCliente(data: ClienteSalvarDto): Promise<ResultadoDto> {
    let cliente: Cliente;

    if (data.id) {
      cliente = await this.clienteRepository.findOne({ where: { id: data.id } });
      if (!cliente) {
        return {
          status: false,
          mensagem: 'Cliente não encontrado',
        };
      }
    } else {
      cliente = new Cliente();
    }

    if (!data.nome) {
      return {
        status: false,
        mensagem: 'Campos obrigatórios não podem estar vazios',
      };
    }

    cliente.nome = data.nome;
    cliente.telefone = data.telefone;
    cliente.cidade = data.cidade;
    cliente.bairro = data.bairro;
    cliente.endereco = data.endereco;
    cliente.numero = data.numero;
    cliente.paga_mensalmente = data.paga_mensalmente ?? 0;
    cliente.paga_semanalmente = data.paga_semanalmente ?? 0;
    cliente.nfe = data.nfe ?? '0';
    cliente.removido = data.removido ?? 0;

    try {
      await this.clienteRepository.save(cliente);
      return {
        status: true,
        mensagem: 'Cliente cadastrado com sucesso',
      };
    } catch (error) {
      console.error('Error saving cliente:', error);
      return {
        status: false,
        mensagem: `Houve um erro ao cadastrar o cliente. ${error.message}`,
      };
    }
  }

  async removeCliente(id: number): Promise<ResultadoDto> {
    const cliente = await this.getClienteById(id)

    if (cliente.removido === 0) {
      cliente.removido = 1;
    }

    return this.clienteRepository.save(cliente)
      .then(() => {
        return <ResultadoDto>{
          status: true,
          mensagem: 'Cliente removido com sucesso'
        }
      }).catch((error) => {
        return <ResultadoDto>{
          status: false,
          mensagem: `Houve um erro ao remover o cliente. ${error}`
        }
      });
  }
}