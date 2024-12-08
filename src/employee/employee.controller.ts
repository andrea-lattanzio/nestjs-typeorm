import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateContactInfoDto, UpdateEmployeeDto, UpdateManagerDto } from './dto/update-employee.dto';
import { EmployeeQueryDto } from './dto/employee-query.dto';
import { UuidValidationPipe } from 'src/pipes/uuid.validation.pipe';

@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Post()
  create(@Body() createEmployeeDto: CreateEmployeeDto) {
    return this.employeeService.create(createEmployeeDto);
  }

  @Get()
  findAll(@Query() findEmployeeDto: EmployeeQueryDto) {
    return this.employeeService.findAll(findEmployeeDto);
  }

  @Get(':id')
  findEmployee(@Param('id', UuidValidationPipe) id: string) {
    return this.employeeService.findEmployee(id);
  }

  @Patch(':id')
  updateEmployee(@Param('id', UuidValidationPipe) employeeId: string, @Body() updateEmployeeDto: UpdateEmployeeDto) {
    return this.employeeService.updateEmployee(employeeId, updateEmployeeDto);
  }

  @Patch('updatemanager/:id')
  addManager(@Param('id', UuidValidationPipe) employeeId: string, @Body() updateManagerDto: UpdateManagerDto) {
    return this.employeeService.addManager(employeeId, updateManagerDto);
  }

  @Patch('updatecontactinfo/:id')
  updateContactInfo(@Param('id', UuidValidationPipe) employeeId: string, @Body() updateContactInfoDto: UpdateContactInfoDto) {
    return this.employeeService.updateContactInfo(employeeId, updateContactInfoDto);
  }

  @Delete(':id')
  remove(@Param('id', UuidValidationPipe) id: string) {
    return this.employeeService.remove(id);
  }
}
