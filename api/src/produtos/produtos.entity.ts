import { Pedido } from "src/pedido/pedido.entity";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
} from "typeorm";

@Entity()
export class Produtos {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  nome: string;

  @Column()
  tipo: string;

  @Column()
  valor: string;
  
  @Column({ length: 1, default: "0" })
  removido: string;

  @Column()
  idInstituicao: number;

  @ManyToMany(() => Pedido, pedido => pedido.produto)
  public pedido: Pedido[];
}
