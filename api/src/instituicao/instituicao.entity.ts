import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Instituicao {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  nome: string;

  @Column()
  cnpj: string;

  @Column()
  tipoInstituicao: number;

  @Column({ default: 0 })
  removido: number;
}