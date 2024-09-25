import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { InstituicaoService } from "./instituicao.service";
import { Instituicao } from "./instituicao.entity";
import { InstituicaoSalvarDto } from "./dto/instituicao.salvar.dto";
import { ResultadoDto } from "src/dto/resultado.dto";

@Controller('instituicao')
export class InstituicaoController {
    constructor(private readonly instituicaoService: InstituicaoService) { }

    @Get('listar')
    async getInstituicao(): Promise<Instituicao[]> {
        return this.instituicaoService.getInstituicao();
    }

    @Get('listar/:id')
    async getInstituicaoById(@Param('id') id): Promise<Instituicao> {
        return this.instituicaoService.getInstituicaoById(JSON.parse(id).id);
    }

    @Post('salvar')
    async salvarInstituicao(@Body() instituicao: InstituicaoSalvarDto): Promise<ResultadoDto> {
        return this.instituicaoService.salvarInstituicao(instituicao['data']);
    }

    @Put('remover/:id')
    async removeInstituicao(@Param('id') id): Promise<ResultadoDto> {
        return this.instituicaoService.removeInstituicao(JSON.parse(id).id);
    }
}