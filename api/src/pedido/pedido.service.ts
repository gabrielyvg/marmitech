import { Inject, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { Pedido } from "./pedido.entity";
import { ResultadoDto } from "src/dto/resultado.dto";

@Injectable()
export class PedidoService {
  constructor(
    @Inject('PEDIDO_REPOSITORY')
    private pedidoRepository: Repository<Pedido>,
  ) { }

  async getPedido(): Promise<Pedido[]> {
    return this.pedidoRepository.find({
      where: [
        { removido: 0 }
      ]
    });
  }

  async getPedidoById(id: number): Promise<Pedido | null> {
    return this.pedidoRepository.findOneBy({ id });
  }

  async salvarPedido(data: any): Promise<ResultadoDto> {
    let pedido: Pedido;

    if (data && data.id) {
      pedido = await this.pedidoRepository.findOne({ where: { id: data.id } });
      if (!pedido) {
        return {
          status: false,
          mensagem: 'Pedido não encontrado',
        };
      }
    } else {
      pedido = new Pedido();
    }
    console.log(data.idsProdutos)
    if (data.idsProdutos) {
      data.idsProdutos.forEach(async produto => {   
        pedido.idCliente = data.idCliente;
        pedido.idProduto = produto.idProduto;
        pedido.quantidade = produto.quantidade;
        pedido.data = data.date;
        pedido.nomeCliente = data.nomeCliente;
        pedido.pago = data.pago ?? 0;
        pedido.removido = data.removido ?? 0;
        try {
          await this.pedidoRepository.save(pedido);
          return {
            status: true,
            mensagem: 'Pedido cadastrado com sucesso',
          };
        } catch (error) {
          console.error('Error saving pedido:', error);
          return {
            status: false,
            mensagem: `Houve um erro ao cadastrar o pedido. ${error.message}`,
          };
        }
      });

    }

    return {
      status: false,
      mensagem: `Houve um erro ao cadastrar o pedido.`,
    };
  }

  async removePedido(id: number): Promise<ResultadoDto> {
    const pedido = await this.getPedidoById(id)

    if (pedido.removido === 0) {
      pedido.removido = 1;
    }

    return this.pedidoRepository.save(pedido)
      .then(() => {
        return <ResultadoDto>{
          status: true,
          mensagem: 'Pedido removido com sucesso'
        }
      }).catch((error) => {
        return <ResultadoDto>{
          status: false,
          mensagem: `Houve um erro ao remover o pedido. ${error}`
        }
      });
  }
}