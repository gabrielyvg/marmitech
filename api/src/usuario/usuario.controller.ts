import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { UsuarioService } from "./usuario.service";
import { Usuario } from "./usuario.entity";
import { UsuarioSalvarDto } from "./dto/usuario.salvar.dto";
import { ResultadoDto } from "src/dto/resultado.dto";
import { UsuarioListDTO } from "./dto/usuario.list.dto";

@Controller('usuario')
export class usuarioController {
    constructor(private readonly usuarioService: UsuarioService) { }

    @Get('listar')
    async getUsuario(): Promise<UsuarioListDTO[]> {
        return this.usuarioService.getUsuario();
    }

    @Get('listar/:id')
    async getUsuarioById(@Param('id') id): Promise<Usuario> {
        return this.usuarioService.getUsuarioById(JSON.parse(id).id);
    }

    @Post('salvar')
    async salvarUsuario(@Body() usuario: UsuarioSalvarDto): Promise<ResultadoDto> {
        return this.usuarioService.salvarUsuario(usuario['data']);
    }

    @Put('remover/:id')
    async removeUsuario(@Param('id') id): Promise<ResultadoDto> {
        return this.usuarioService.removeUsuario(JSON.parse(id).id);
    }
}