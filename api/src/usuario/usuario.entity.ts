import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  nome: string;

  @Column()
  telefone: string;

  @Column()
  tipoPessoa: number;

  @Column()
  idInstituicao: number;
  
  @Column()
  token: string;

  @Column({ default: 0 })
  removido: number;
}