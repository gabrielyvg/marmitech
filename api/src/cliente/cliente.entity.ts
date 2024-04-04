import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Cliente {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  nome: string;

  @Column()
  telefone: string;

  @Column('text')
  endereco: string;

  @Column()
  numero: number;

  @Column({ length: 500 })
  bairro: string;
  
  @Column({ length: 500 })
  cidade: string;

  @Column({ default: 0 })
  paga_mensalmente: number;

  @Column({ default: '0' })
  nfe: string;

  @Column({ default: 0 })
  removido: number;

  // @CreateDateColumn()
  // created_at: Date;

  // @UpdateDateColumn()
  // updated_at: Date;

  // @Column()
  // created_by: number;

  // @Column()
  // updated_by: number;
}