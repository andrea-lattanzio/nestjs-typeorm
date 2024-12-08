import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsUUID,
} from 'class-validator';

export class UpdateEmployeeDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name?: string;
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  position?: string;
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  department?: string;
}

export class UpdateManagerDto {
  @IsUUID()
  managerId: string;
}

export class UpdateContactInfoDto {
  @IsEmail()
  email: string;

  @IsPhoneNumber(null)
  phone: string;
}
