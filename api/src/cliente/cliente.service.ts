import { Injectable, Inject } from "@nestjs/common";
import { Repository } from "typeorm";
import { Cliente } from "./cliente.entity";
import { ClienteSalvarDto } from "./dto/cliente.salvar.dto";
import { ResultadoDto } from "src/dto/resultado.dto";
import { BadRequestException } from "@nestjs/common";
@Injectable()
export class ClienteService {
  constructor(
    @Inject("CLIENTE_REPOSITORY")
    private clienteRepository: Repository<Cliente>
  ) {}

  async getCliente(): Promise<Cliente[]> {
    return this.clienteRepository.find({
      where: [{ removido: 0 }],
      order: {
        createdAt: "DESC",
      },
    });
  }

  async getClienteById(id: number): Promise<Cliente | null> {
    return this.clienteRepository.findOneBy({ id });
  }

  async salvarCliente(client: ClienteSalvarDto): Promise<ResultadoDto> {
    let cliente: Cliente;
    console.log(client);
    try {
      if (client.id) {
        cliente = await this.clienteRepository.findOne({
          where: { id: client.id },
        });

        if (!cliente) {
          return {
            status: false,
            mensagem: "Cliente não encontrado",
          };
        }
      } else {
        cliente = new Cliente();
      }

      if (!client.nome) {
        throw new BadRequestException(
          "Campos obrigatórios não podem estar vazios."
        );
      }

      client.numero = client.numero ? client.numero : 0;
      client.idInstituicao = 0;

      await this.clienteRepository.save(client);
      return {
        status: true,
        mensagem: "Cliente cadastrado com sucesso",
      };
    } catch (error) {
      console.error("Error saving cliente:", error);
      return {
        status: false,
        mensagem: `Houve um erro ao cadastrar o cliente. ${error.message}`,
      };
    }
  }

  async removeCliente(id: number): Promise<ResultadoDto> {
    const cliente = await this.getClienteById(id);

    if (cliente.removido === 0) {
      cliente.removido = 1;
    }

    return this.clienteRepository
      .save(cliente)
      .then(() => {
        return <ResultadoDto>{
          status: true,
          mensagem: "Cliente removido com sucesso",
        };
      })
      .catch((error) => {
        return <ResultadoDto>{
          status: false,
          mensagem: `Houve um erro ao remover o cliente. ${error}`,
        };
      });
  }
}
