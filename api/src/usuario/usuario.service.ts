import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Usuario } from './usuario.entity';
import { UsuarioSalvarDto } from './dto/usuario.salvar.dto';
import { ResultadoDto } from 'src/dto/resultado.dto';
import * as bcrypt from 'bcrypt';
import { UsuarioListDTO } from './dto/usuario.list.dto';
@Injectable()
export class UsuarioService {
  constructor(
    @Inject('USUARIO_REPOSITORY')
    private usuarioRepository: Repository<Usuario>,
  ) { }

  async getUsuario(): Promise<UsuarioListDTO[]> {
    let usuarios = await this.usuarioRepository.find({
      where: [
        { removido: 0 }
      ]
    });

    // TODO: deixar dinamico
    return usuarios.map(usuario => ({
      id: usuario.id,
      nome: usuario.nome,
      telefone: usuario.telefone,
      email: usuario.email,
      tipoPessoa: usuario.tipoPessoa,
      idInstituicao: usuario.idInstituicao,
      tipoUsuario: usuario.tipoPessoa === 1 ? 'Administrador' : 'Financeiro',
    }));
  }

  async getUsuarioById(id: number): Promise<Usuario | null> {
    return this.usuarioRepository.findOneBy({ id });
  }

  async salvarUsuario(data: UsuarioSalvarDto): Promise<ResultadoDto> {
    let usuario: Usuario;

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
    usuario.telefone = data.telefone;
    usuario.tipoPessoa = data.tipoPessoa;
    usuario.idInstituicao = data.idInstituicao ? data.idInstituicao : 0;
    usuario.email = data.email;
    usuario.token = await this.encryptPassword(data.senha);

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

  async encryptPassword(senha): Promise<string> {
    const saltOrRounds = 10;
    const hashedSenha = await bcrypt.hash(senha, saltOrRounds);
    return hashedSenha;
  }

  public verifyEmail(): any {

  }

  async getUsuarioByEmail(email): Promise<Usuario> {
    try {
      return await this.usuarioRepository.findOne({ where: { email: email } });
    } catch (error) {
      console.error(error);
    }
  }
}