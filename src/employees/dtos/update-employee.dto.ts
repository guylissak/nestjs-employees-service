import {
  IsEmail,
  IsString,
  IsNumber,
  IsOptional,
  Min,
  Max,
  IsEnum,
} from 'class-validator';
import { Roles } from './create-employee.dto';

export class UpdateEmployeeDto {
  @IsEmail()
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  title: string;

  @IsString()
  @IsOptional()
  department: string;

  @IsNumber()
  @Min(10000)
  @Max(100000)
  @IsOptional()
  salary: number;

  @IsEnum(Roles)
  @IsOptional()
  role: string;
}
