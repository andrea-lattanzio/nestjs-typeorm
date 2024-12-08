import { IsString, IsEmail, IsNotEmpty, IsPhoneNumber, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class CreateContactInfoDTO {
  @IsEmail() 
  email: string;

  @IsPhoneNumber(null) 
  phone: string;
}

export class CreateEmployeeDto {
  @IsString() 
  @IsNotEmpty() 
  name: string;

  @IsString() 
  @IsNotEmpty() 
  position: string;

  @IsString() 
  @IsNotEmpty() 
  department: string;

  @ValidateNested() 
  @Type(() => CreateContactInfoDTO) 
  contactInfo: CreateContactInfoDTO;
}