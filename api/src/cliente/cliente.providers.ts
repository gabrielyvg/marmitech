import { DataSource } from 'typeorm';
import { Cliente } from './cliente.entity';

export const clienteProviders = [
  {
    provide: 'CLIENTE_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Cliente),
    inject: ['DATA_SOURCE'],
  },
];