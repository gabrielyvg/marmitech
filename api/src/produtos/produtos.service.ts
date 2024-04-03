import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Produtos } from './produtos.entity';
import { ProdutosSalvarDto } from './dto/produtos.salvar.dto';
import { ResultadoDto } from 'src/dto/resultado.dto';

@Injectable()
export class ProdutosService {
  constructor(
    @Inject('PRODUTOS_REPOSITORY')
    private produtosRepository: Repository<Produtos>,
  ) { }

  async getProduto(): Promise<Produtos[]> {
    return this.produtosRepository.find({
      where: [
        { removido: '0' }
      ]
    });
  }

  async getProdutoById(id: number): Promise<Produtos | null> {
    return this.produtosRepository.findOneBy({ id });
  }

  async salvarProduto(data: ProdutosSalvarDto): Promise<ResultadoDto> {
    let produto;
    if (data.id) {
      produto = await this.getProdutoById(data.id);
      produto.id = data.id;
    } else {
      produto = new Produtos();
    }
    produto.nome = data.nome;
    produto.tipo = data.tipo;
    produto.valor = data.valor;

    return this.produtosRepository.save(produto)
      .then(() => {
        return <ResultadoDto>{
          status: true,
          mensagem: 'Produto cadastrado com sucesso'
        }
      }).catch((error) => {
        console.error('Error saving pliente:', error);
        return <ResultadoDto>{
          status: false,
          mensagem: `Houve um erro ao cadastrar o produto. ${error}`
        }
      });
  }

  async removeProduto(id: number): Promise<ResultadoDto> {
    const produto = await this.getProdutoById(id)

    if (produto.removido === '0') {
      produto.removido = '1';
    }

    return this.produtosRepository.save(produto)
      .then(() => {
        return <ResultadoDto>{
          status: true,
          mensagem: 'Produto removido com sucesso'
        }
      }).catch((error) => {
        return <ResultadoDto>{
          status: false,
          mensagem: `Houve um erro ao remover o produto. ${error}`
        }
      });
  }
}