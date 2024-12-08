import { Module } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeController } from './employee.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from './entities/employee.entity';
import { ContactInfo } from './entities/contact-info.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Employee, ContactInfo])],
  controllers: [EmployeeController],
  providers: [EmployeeService],
  exports: [TypeOrmModule],
})
export class EmployeeModule {}
