import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { pedidoProviders } from './pedido.providers';
import { PedidoService } from './pedido.service';
import { ClienteController } from 'src/cliente/cliente.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [ClienteController],
  providers: [
    ...pedidoProviders,
    PedidoService,
  ],
})
export class PedidoModule {}