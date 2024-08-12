import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { pedidoProviders } from './pedido.providers';
import { PedidoService } from './pedido.service';
import { PedidoController } from './pedido.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [PedidoController],
  providers: [
    ...pedidoProviders,
    PedidoService,
  ],
})
export class PedidoModule {}