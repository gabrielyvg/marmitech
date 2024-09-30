export interface UsuarioSalvarDto {
    id: number;
    nome: string;
    telefone: string;
    tipoPessoa: number;
    idInstituicao: number;
    token: string;
    removido?: number;
}