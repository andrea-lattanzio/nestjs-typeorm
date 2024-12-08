import {
  ArrayNotEmpty,
  IsArray,
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class UpdateMeetingDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  title?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  description?: string;

  @IsOptional()
  @IsDateString()
  @IsNotEmpty()
  date?: Date;

  @IsOptional()
  @IsDateString()
  startTime?: Date;

  @IsOptional()
  @IsDateString()
  endTime?: Date;
}

export class UpdateAttendeesDto {
  @IsArray()
  @ArrayNotEmpty({ message: 'The attendees array must not be empty' })
  @IsUUID('4', { each: true, message: 'Each id has to be a valud UUID' })
  attendeeIds: string[];
}
