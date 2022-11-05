import { Test, TestingModule } from '@nestjs/testing';
import { EmployeesService } from './employees.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Employee } from './Employee.entity';
import { EmployeesRepository } from './employees.repository';
import { IEmployeesRepository } from './interfaces/employeesRepository';

describe('EmployeesService', () => {
  let service: EmployeesService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EmployeesService,
        EmployeesRepository,
        {
          provide: IEmployeesRepository,
          useClass: EmployeesRepository,
        },
        {
          provide: getRepositoryToken(Employee),
          useValue: {
            create: (attrs: Partial<Employee>): Promise<Employee> => {
              return Promise.resolve({
                id: Math.floor(Math.random() * 9999),
                email: attrs.email,
                title: attrs.title,
                department: attrs.department,
                salary: attrs.salary,
                role: attrs.role,
              });
            },
            save: (Employee: Employee) => {
              return Promise.resolve(Employee);
            },
          },
        },
      ],
    }).compile();

    service = module.get<EmployeesService>(EmployeesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Create a new Employee', async () => {
    const employee = {
      email: 'test@test.com',
      title: 'VP test',
      department: 'R&D',
      salary: 100000,
      role: 'superAdmin',
    };
    const Employee = await service.create(employee);
    expect(Employee).toBeDefined();
    expect(Employee.email).toEqual('test@test.com');
  });
});
