export interface UsuarioSalvarDto {
    id: number;
    nome: string;
    telefone: string;
    tipoPessoa: number;
    idInstituicao: number;
    token: string;
    email: string;
    senha: string;
    removido?: number;
}