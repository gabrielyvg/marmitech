import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { clienteProviders } from './cliente.providers';
import { ClienteService } from './cliente.service';
import { ClienteController } from './cliente.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [ClienteController],
  providers: [
    ...clienteProviders,
    ClienteService,
  ],
})
export class ClienteModule {}