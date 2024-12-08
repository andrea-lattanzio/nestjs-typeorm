import { Type } from "class-transformer";
import { IsOptional, IsString, IsInt, Min, IsDate, IsEnum } from "class-validator";
import { Priority, Status } from "../entities/task.entity";

export class TaskQueryDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsEnum(Priority)
  priority?: string;

  @IsOptional()
  @IsEnum(Status)
  status?: string;

  @Type(() => Number)
  @IsOptional()
  @IsInt()
  @Min(1)
  page?: number = 1;

  @Type(() => Number)
  @IsOptional()
  @IsInt()
  @Min(1)
  limit?: number = 10;
}