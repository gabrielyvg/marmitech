export interface ClienteSalvarDto {
    nome: string;
    
    telefone?: string;
    endereco?: string;
    numero?: number;
    bairro?: string;
    cidade?: string;
    paga_mensalmente?: number;
    nfe: string;
    removido?: number;
    // created_at?: Date;
    // updated_at?: Date;
    // created_by?: number;
    // updated_by?: number;
}