import { Inject, Injectable } from "@nestjs/common";
import { UsuarioService } from "src/usuario/usuario.service";
import { Repository } from "typeorm";
import * as bcrypt from 'bcrypt';
import { ResultadoDto } from "src/dto/resultado.dto";

@Injectable()
export class LoginService {
  constructor(
    private readonly usuarioService: UsuarioService
  ) { }

  async login(loginData): Promise<ResultadoDto> {
    let usuario = await this.usuarioService.getUsuarioByEmail(loginData.email);
    if (bcrypt.compare(loginData.password, usuario.token)) {
      return {
        status: true,
        mensagem: 'Login realizado com sucesso',
      };
    }

    return {
      status: false,
      mensagem: 'Senha ou email inválido',
    };
  }
}