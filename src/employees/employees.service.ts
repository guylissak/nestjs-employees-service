import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { IEmployeesRepository } from './interfaces/employeesRepository';
import { Employee } from './employee.entity';

@Injectable()
export class EmployeesService {
  constructor(private employeesRepository: IEmployeesRepository) {}

  async create(attrs: Partial<Employee>): Promise<Employee> {
    console.log('CREATE');
    const employee = await this.employeesRepository.create(attrs);

    return this.employeesRepository.save(employee);
  }

  findOne(email: string) {
    if (!email) {
      return null;
    }
    return this.employeesRepository.findOne(email);
  }

  find(): Promise<Employee[]> {
    return this.employeesRepository.find();
  }

  async update(email: string, attrs: Partial<Employee>) {
    const employee = await this.findOne(email);
    if (!employee) {
      throw new NotFoundException('employee not found');
    }
    const updatedEmployee = {
      ...employee,
      ...attrs,
    };
    return this.employeesRepository.save(updatedEmployee);
  }

  async remove(email: string) {
    const employee = await this.findOne(email);
    if (!employee) {
      throw new NotFoundException('employee not found');
    }
    return this.employeesRepository.remove(employee.email);
  }
}
