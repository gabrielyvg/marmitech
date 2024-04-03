import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { produtoProviders } from './produtos.providers';
import { ProdutosService } from './produtos.service';
import { ProdutosController } from './produtos.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [ProdutosController],
  providers: [
    ...produtoProviders,
    ProdutosService,
  ],
})
export class ProdutosModule {}