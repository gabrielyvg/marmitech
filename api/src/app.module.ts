import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClienteModule } from './cliente/cliente.module';
import { ConfigModule } from '@nestjs/config';
import { ProdutosModule } from './produtos/produtos.module';
import { PedidoModule } from './pedido/pedido.module';
import { InstituicaoModule } from './instituicao/instituicao.module';
import { UsuarioModule } from './usuario/usuario.module';

@Module({
  imports: [
    ClienteModule,
    ProdutosModule,
    PedidoModule,
    InstituicaoModule,
    UsuarioModule,
    ConfigModule.forRoot()
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
