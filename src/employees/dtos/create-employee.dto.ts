import { IsEmail, IsNumber, IsString, Min, Max, IsEnum } from 'class-validator';

export enum Roles {
  'admin',
  'user',
  'superAdmin',
}

export class CreateEmployeeDto {
  @IsEmail()
  email: string;

  @IsString()
  title: string;

  @IsString()
  department: string;

  @IsNumber()
  @Min(10000)
  @Max(100000)
  salary: number;

  @IsEnum(Roles)
  role: string;
}
