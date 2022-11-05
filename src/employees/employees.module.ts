import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from './employee.entity';
import { EmployeesController } from './employees.controller';
import { EmployeesMockRepository } from './employees.mockRepository';
import { EmployeesRepository } from './employees.repository';
import { IEmployeesRepository } from './interfaces/employeesRepository';
import { EmployeesService } from './employees.service';

@Module({
  imports: [TypeOrmModule.forFeature([Employee])],
  controllers: [EmployeesController],
  providers: [
    EmployeesService,
    {
      provide: IEmployeesRepository,
      useClass: EmployeesRepository,
    },
  ],
})
export class EmployeesModule {}
