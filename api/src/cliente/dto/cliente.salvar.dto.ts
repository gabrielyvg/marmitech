import { IsOptional, IsNumber, IsString } from "class-validator";

export class ClienteSalvarDto {
  id: number;
  @IsString()
  nome: string;

  @IsString()
  @IsOptional()
  telefone?: string;

  @IsString()
  @IsOptional()
  endereco?: string;

  @IsNumber()
  @IsOptional()
  numero?: number;

  @IsString()
  @IsOptional()
  bairro?: string;

  @IsString()
  @IsOptional()
  cidade?: string;

  @IsNumber()
  @IsOptional()
  paga_mensalmente?: number;

  @IsNumber()
  @IsOptional()
  paga_semanalmente?: number;

  @IsString()
  @IsOptional()
  nfe?: string;
  removido?: number;
  idInstituicao?: number;
  // created_at?: Date;
  // updated_at?: Date;
  // created_by?: number;
  // updated_by?: number;
}
