export interface InstituicaoSalvarDto {
    id: number;
    nome: string;
    cnpj: string;
    tipoInstituicao: number;
    removido?: number;
}