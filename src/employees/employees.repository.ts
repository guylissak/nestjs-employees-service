import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from './employee.entity';
import { IEmployeesRepository } from './interfaces/employeesRepository';

@Injectable()
export class EmployeesRepository implements IEmployeesRepository {
  constructor(@InjectRepository(Employee) private repo: Repository<Employee>) {}

  create(attrs: Partial<Employee>): Promise<Employee> {
    const employee = this.repo.create(attrs);

    return this.save(employee);
  }

  findOne(email: string) {
    if (!email) {
      return null;
    }
    return this.repo.findOne(email);
  }

  find(): Promise<Employee[]> {
    return this.repo.find();
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
    return this.save(updatedEmployee);
  }

  async remove(email: string) {
    const employee = await this.findOne(email);
    if (!employee) {
      throw new NotFoundException('employee not found');
    }
    return this.repo.remove(employee);
  }

  async save(employee: Employee) {
    return this.repo.save(employee);
  }
}
