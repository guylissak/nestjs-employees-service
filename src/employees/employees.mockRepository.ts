import { Injectable, NotFoundException } from '@nestjs/common';
import { Employee } from './employee.entity';
import { IEmployeesRepository } from './interfaces/employeesRepository';

@Injectable()
export class EmployeesMockRepository implements IEmployeesRepository {
  constructor() {}

  create(attrs: Partial<Employee>): Promise<Employee> {
    return Promise.resolve({
      id: Math.floor(Math.random() * 9999),
      email: attrs.email,
      title: attrs.title,
      salary: attrs.salary,
      department: attrs.department,
      role: attrs.role,
    });
  }

  findOne(email: string): Promise<Employee> {
    throw new NotFoundException('This is a mock, please implement it');
  }

  find(): Promise<Employee[]> {
    throw new NotFoundException('This is a mock, please implement it');
  }

  async update(email: string, attrs: Partial<Employee>) {
    throw new NotFoundException('This is a mock, please implement it');
  }

  async remove(email: string): Promise<Employee> {
    throw new NotFoundException('This is a mock, please implement it');
  }

  async save(employee: Employee) {
    return Promise.resolve({
      id: employee.id,
      email: employee.email,
      title: employee.title,
      salary: employee.salary,
      department: employee.department,
      role: employee.role,
    });
  }
}
