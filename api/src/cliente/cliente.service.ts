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
    return this.clienteRepository.find();
  }

  async getClienteById(id: number): Promise<Cliente | null> {
    return this.clienteRepository.findOneBy({ id });
  }

  async salvarCliente(data: ClienteSalvarDto): Promise<ResultadoDto> {
    let cliente = new Cliente();
    console.log('datra', data);
    cliente.nome = data.nome;
    cliente.telefone = data.telefone;
    cliente.cidade = data.cidade;
    cliente.bairro = data.bairro;
    cliente.endereco = data.endereco;
    cliente.numero = data.numero;
    cliente.paga_mensalmente = data.paga_mensalmente;
    cliente.nfe = data.nfe;
    cliente.removido = data.removido = 0;
   /*  return <ResultadoDto>{
      status: false,
      mensagem: `Houve um erro ao cadastrar o cliente.`
    } */
    return this.clienteRepository.save(cliente)
      .then((result) => {
        return <ResultadoDto>{
          status: true,
          mensagem: 'Cliente cadastrado com sucesso'
        }
      }).catch((error) => {
        console.error('Error saving cliente:', error);
        return <ResultadoDto>{
          status: false,
          mensagem: `Houve um erro ao cadastrar o cliente. ${error}`
        }
      });
  }

  async removeCliente(id: number): Promise<void> {
    await this.clienteRepository.delete(id);
  }
}