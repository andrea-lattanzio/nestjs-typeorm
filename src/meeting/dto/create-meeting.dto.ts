import { IsString, IsNotEmpty, IsDateString, IsOptional, IsUUID } from "class-validator";

export class CreateMeetingDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsDateString()
  @IsNotEmpty()
  date: Date;

  @IsDateString()
  startTime: Date;

  @IsOptional()
  @IsDateString()
  endTime: Date;

  @IsUUID()
  ownerId: string;
}
