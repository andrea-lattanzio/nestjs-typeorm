import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { postgresDbConfig } from './database.config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () => {
        try {
          await postgresDbConfig.initialize();
          console.log('connected');
          return postgresDbConfig.options;
        } catch (error) {
          console.log('error');
          throw error;
        }
      }
    }),
  ],
})
export class DatabaseModule {}
