import { Body, Controller, Delete, Get, Post, Put } from "@nestjs/common";
import { ClienteService } from "./cliente.service";
import { Cliente } from "./cliente.entity";
import { ClienteSalvarDto } from "./dto/cliente.salvar.dto";
import { ResultadoDto } from "src/dto/resultado.dto";

@Controller('cliente')
export class ClienteController {
    constructor(private readonly clienteService: ClienteService) { }

    @Get('listar')
    async getCliente(): Promise<Cliente[]> {
        return this.clienteService.getCliente();
    }

    @Get('listar/id')
    async getClienteById(id): Promise<Cliente> {
        return this.clienteService.getClienteById(id);
    }

    @Post('salvar')
    async salvarCliente(@Body() cliente: ClienteSalvarDto): Promise<ResultadoDto> {
        return this.clienteService.salvarCliente(JSON.parse(cliente['data']));
    }

    @Delete('remover')
    async removeCliente(id): Promise<void> {
        await this.clienteService.removeCliente(id);
    }
}