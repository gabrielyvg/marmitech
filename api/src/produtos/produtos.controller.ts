import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { ProdutosService } from "./produtos.service";
import { Produtos } from "./produtos.entity";
import { ProdutosSalvarDto } from "./dto/produtos.salvar.dto";
import { ResultadoDto } from "src/dto/resultado.dto";

@Controller('Produtos')
export class ProdutosController {
    constructor(private readonly produtosService: ProdutosService) { }

    @Get('listar')
    async getProdutos(): Promise<Produtos[]> {
        return this.produtosService.getProduto();
    }

    @Get('listar/:id')
    async getProdutosById(@Param('id') id): Promise<Produtos> {
        return this.produtosService.getProdutoById(JSON.parse(id).id);
    }

    @Post('salvar')
    async salvarProdutos(@Body() Produtos: ProdutosSalvarDto): Promise<ResultadoDto> {
        return this.produtosService.salvarProduto(Produtos['data']);
    }

    @Put('remover/:id')
    async removeProdutos(@Param('id') id): Promise<ResultadoDto> {
        return this.produtosService.removeProduto(JSON.parse(id).id);
    }
}