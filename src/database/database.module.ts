import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { mysqlDbConfig, postgresDbConfig } from './database.config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () => {
        try {
          await mysqlDbConfig.initialize();
          console.log('connected');
          return mysqlDbConfig.options;
        } catch (error) {
          console.log('error');
          throw error;
        }
      }
    }),
  ],
})
export class DatabaseModule {}
