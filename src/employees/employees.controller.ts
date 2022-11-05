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
  SetMetadata,
} from '@nestjs/common';
import { RolesGuard } from 'src/guards/roles.guard';
import { CreateEmployeeDto } from './dtos/create-employee.dto';
import { UpdateEmployeeDto } from './dtos/update-employee.dto';
import { EmployeesService } from './employees.service';
import { Roles } from 'src/decorators/roles.decorator';

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
  @UseGuards(RolesGuard)
  @SetMetadata('roles', ['admin', 'superAdmin'])
  async findAllEmployees() {
    return await this.employeesService.find();
  }

  @Patch('/:email')
  @UseGuards(RolesGuard)
  @SetMetadata('roles', ['admin', 'superAdmin'])
  async updateEmployee(
    @Param('email') email: string,
    @Body() body: UpdateEmployeeDto,
  ) {
    return await this.employeesService.update(email, body);
  }

  @Delete('/:email')
  @UseGuards(RolesGuard)
  @SetMetadata('roles', ['superAdmin'])
  async deleteEmployee(@Param('email') email: string) {
    return await this.employeesService.remove(email);
  }
}
