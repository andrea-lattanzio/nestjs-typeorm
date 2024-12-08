import { IsString, IsEnum, IsOptional, IsDate, IsNotEmpty, IsUUID, isNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';
import { Priority, Status } from '../entities/task.entity';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsEnum(Status)
  status: Status; 

  @IsEnum(Priority)
  priority: Priority;

  @Type(() => Date)
  @IsDate()
  dueDate: Date;

  @IsOptional()
  @IsUUID() 
  employeeId: string;
}
