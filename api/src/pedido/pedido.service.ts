import { Inject, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { Pedido } from "./pedido.entity";
import { ResultadoDto } from "src/dto/resultado.dto";
@Injectable()
export class PedidoService {
  constructor(
    @Inject('PEDIDO_REPOSITORY')
    private pedidoRepository: Repository<Pedido>
  ) { }

  async getPedido(): Promise<Pedido[]> {
    const pedidos = await this.pedidoRepository.createQueryBuilder('pedido')
      .leftJoinAndSelect('pedido.cliente', 'cliente')
      .leftJoinAndSelect('pedido.produto', 'produto')
      .where('pedido.removido = :removido', { removido: 0 })
      .getMany();
    console.log('pedidos', pedidos)
    return pedidos;
  }

  async getPedidoById(id: number): Promise<Pedido | null> {
    return this.pedidoRepository.findOneBy({ id });
  }

  async salvarPedido(data: any): Promise<ResultadoDto> {
    let pedido: Pedido;
    try {
      if (data && data.id) {
        pedido = await this.pedidoRepository.findOne({ where: { id: data.id } });
        if (!pedido) {
          return {
            status: false,
            mensagem: 'Pedido não encontrado',
          };
        }
      }

      if (data.idsProdutos && Array.isArray(data.idsProdutos) && data.idsProdutos.length > 0) {
        const pedidosParaSalvar = [];
        for (const produto of data.idsProdutos) {
          const pedidoAtual = !pedido ? new Pedido() : pedido;
          pedidoAtual.idCliente = data.idCliente;
          pedidoAtual.idProduto = produto.idProduto;
          pedidoAtual.quantidade = produto.quantidade;
          pedidoAtual.data = data.date;
          pedidoAtual.nomeCliente = data.nomeCliente;
          pedidoAtual.pago = data.pago ?? 0;
          pedidoAtual.removido = data.removido ?? 0;

          pedidosParaSalvar.push(pedidoAtual);
        }
        await this.pedidoRepository.save(pedidosParaSalvar);

        return {
          status: true,
          mensagem: 'Todos os pedidos foram cadastrados com sucesso',
        };
      }
    } catch (error) {
      console.error('Error saving pedido:', error);
      return {
        status: false,
        mensagem: `Houve um erro ao cadastrar o pedido. ${error.message}`,
      };
    }
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