import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dbEnv } from './configs/env';
import { ConfigModule } from '@nestjs/config';
import { AppController} from './app.controller';
import configurations from './configs/configurations';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: dbEnv.databaseUrl,
      autoLoadEntities: true,
      synchronize: false,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [configurations],
    }),
  ],
  controllers: [AppController],
})
export class AppModule {}
