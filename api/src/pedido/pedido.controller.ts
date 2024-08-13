import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { PedidoService } from "./pedido.service";
import { Pedido } from "./pedido.entity";
import { ResultadoDto } from "src/dto/resultado.dto";

@Controller('pedido')
export class PedidoController {
    constructor(private readonly pedidoService: PedidoService) { }

    @Get('listar')
    async getCliente(): Promise<Pedido[]> {
        return this.pedidoService.getPedido();
    }

    @Get('listar/:id')
    async getPedidoById(@Param('id') id): Promise<Pedido> {
        return this.pedidoService.getPedidoById(JSON.parse(id).id);
    }

    @Post('salvar')
    async salvarPedido(@Body() pedido: any): Promise<ResultadoDto> {
        return this.pedidoService.salvarPedido(pedido);
    }

    @Put('remover/:id')
    async removePedido(@Param('id') id): Promise<ResultadoDto> {
        return this.pedidoService.removePedido(JSON.parse(id).id);
    }
}