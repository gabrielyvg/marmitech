import { DataSource } from 'typeorm';
import { Instituicao } from './instituicao.entity';

export const instituicaoProviders = [
  {
    provide: 'INSTITUICAO_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Instituicao),
    inject: ['DATA_SOURCE'],
  },
];