import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Instituicao } from './instituicao.entity';
import { InstituicaoSalvarDto } from './dto/instituicao.salvar.dto';
import { ResultadoDto } from 'src/dto/resultado.dto';

@Injectable()
export class InstituicaoService {
  constructor(
    @Inject('INSTITUICAO_REPOSITORY')
    private instituicaoRepository: Repository<Instituicao>,
  ) { }

  async getInstituicao(): Promise<Instituicao[]> {
    return this.instituicaoRepository.find({
      where: [
        { removido: 0 }
      ]
    });
  }

  async getInstituicaoById(id: number): Promise<Instituicao | null> {
    return this.instituicaoRepository.findOneBy({ id });
  }

  async salvarInstituicao(data: InstituicaoSalvarDto): Promise<ResultadoDto> {
    let instituicao: Instituicao;
    console.log(data);
    if (data && data.id) {
      instituicao = await this.instituicaoRepository.findOne({ where: { id: data.id } });
      if (!instituicao) {
        return {
          status: false,
          mensagem: 'Instituicao não encontrada',
        };
      }
    } else {
      instituicao = new Instituicao();
    }

    if (data && !data.nome) {
      return {
        status: false,
        mensagem: 'Campos obrigatórios não podem estar vazios',
      };
    }

    instituicao.nome = data.nome;
    instituicao.cnpj = data.cnpj;
    instituicao.tipoInstituicao = data.tipoInstituicao;

    try {
      await this.instituicaoRepository.save(instituicao);
      return {
        status: true,
        mensagem: 'Instituicao cadastrada com sucesso',
      };
    } catch (error) {
      console.error('Error saving instituicao:', error);
      return {
        status: false,
        mensagem: `Houve um erro ao cadastrar a instituicao. ${error.message}`,
      };
    }
  }

  async removeInstituicao(id: number): Promise<ResultadoDto> {
    const instituicao = await this.getInstituicaoById(id)

    if (instituicao.removido === 0) {
      instituicao.removido = 1;
    }

    return this.instituicaoRepository.save(instituicao)
      .then(() => {
        return <ResultadoDto>{
          status: true,
          mensagem: 'Instituicao removido com sucesso'
        }
      }).catch((error) => {
        return <ResultadoDto>{
          status: false,
          mensagem: `Houve um erro ao remover o instituicao. ${error}`
        }
      });
  }
}