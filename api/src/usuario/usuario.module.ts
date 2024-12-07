import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { usuarioController } from './usuario.controller';
import { usuarioProviders } from './usuario.providers';
import { UsuarioService } from './usuario.service';

@Module({
  imports: [DatabaseModule],
  controllers: [usuarioController],
  providers: [
    ...usuarioProviders,
    UsuarioService,
  ],
})
export class UsuarioModule {}