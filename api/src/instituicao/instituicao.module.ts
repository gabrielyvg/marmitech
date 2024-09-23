import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { instituicaoProviders } from './instituicao.providers';
import { InstituicaoService } from './instituicao.service';
import { InstituicaoController } from './instituicao.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [InstituicaoController],
  providers: [
    ...instituicaoProviders,
    InstituicaoService,
  ],
})
export class InstituicaoModule {}