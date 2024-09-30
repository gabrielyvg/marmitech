import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Usuario } from './usuario.entity';
import { UsuarioSalvarDto } from './dto/usuario.salvar.dto';
import { ResultadoDto } from 'src/dto/resultado.dto';

@Injectable()
export class UsuarioService {
  constructor(
    @Inject('USUARIO_REPOSITORY')
    private usuarioRepository: Repository<Usuario>,
  ) { }

  async getUsuario(): Promise<Usuario[]> {
    return this.usuarioRepository.find({
      where: [
        { removido: 0 }
      ]
    });
  }

  async getUsuarioById(id: number): Promise<Usuario | null> {
    return this.usuarioRepository.findOneBy({ id });
  }

  async salvarUsuario(data: UsuarioSalvarDto): Promise<ResultadoDto> {
    let usuario: Usuario;
    console.log(data);
    if (data && data.id) {
      usuario = await this.usuarioRepository.findOne({ where: { id: data.id } });
      if (!usuario) {
        return {
          status: false,
          mensagem: 'Usuario não encontrado',
        };
      }
    } else {
      usuario = new Usuario();
    }

    if (data && !data.nome) {
      return {
        status: false,
        mensagem: 'Campos obrigatórios não podem estar vazios',
      };
    }

    usuario.nome = data.nome;

    try {
      await this.usuarioRepository.save(usuario);
      return {
        status: true,
        mensagem: 'Usuario cadastrado com sucesso',
      };
    } catch (error) {
      console.error('Error saving usuario:', error);
      return {
        status: false,
        mensagem: `Houve um erro ao cadastrar a usuario. ${error.message}`,
      };
    }
  }

  async removeUsuario(id: number): Promise<ResultadoDto> {
    const usuario = await this.getUsuarioById(id);
    if (usuario.removido === 0) {
      usuario.removido = 1;
    }

    return this.usuarioRepository.save(usuario)
      .then(() => {
        return <ResultadoDto>{
          status: true,
          mensagem: 'Usuario removido com sucesso'
        }
      }).catch((error) => {
        return <ResultadoDto>{
          status: false,
          mensagem: `Houve um erro ao remover o usuario. ${error}`
        }
      });
  }
}