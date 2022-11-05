import {
  Body,
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Param,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { CreateEmployeeDto } from './dtos/create-employee.dto';
import { UpdateEmployeeDto } from './dtos/update-employee.dto';
import { EmployeesService } from './employees.service';

@Controller('employees')
export class EmployeesController {
  constructor(private employeesService: EmployeesService) {}

  @Post('/new')
  async createEmployee(@Body() body: CreateEmployeeDto) {
    const employee = await this.employeesService.create(body);
    return employee;
  }

  @Get('/:email')
  async findEmployee(@Param('email') email: string) {
    const employee = await this.employeesService.findOne(email);
    if (!employee) {
      throw new NotFoundException('user not found');
    }
    return employee;
  }

  @Get()
  async findAllEmployees() {
    return await this.employeesService.find();
  }

  @Patch('/:email')
  async updateEmployee(
    @Param('email') email: string,
    @Body() body: UpdateEmployeeDto,
  ) {
    return await this.employeesService.update(email, body);
  }

  @Delete('/:email')
  async deleteEmployee(@Param('email') email: string) {
    return await this.employeesService.remove(email);
  }
}
