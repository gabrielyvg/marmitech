export interface PedidoSalvarDto {
  id: number;
  idCliente: number;
  idProduto: number;
  pago: number;
  date: Date;
  removido: number;
  nomeCliente: string;
  quantidade: number;
}