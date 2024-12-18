import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { EmployeeModule } from './employee/employee.module';
import { ConfigModule } from '@nestjs/config';
import { TaskModule } from './task/task.module';
import { MeetingModule } from './meeting/meeting.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), DatabaseModule, EmployeeModule, TaskModule, MeetingModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
