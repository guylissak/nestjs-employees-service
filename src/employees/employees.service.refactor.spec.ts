import { Test, TestingModule } from '@nestjs/testing';
import { EmployeesService } from './employees.service';
import { IEmployeesRepository } from './interfaces/employeesRepository';
import { EmployeesMockRepository } from './employees.mockRepository';

describe('EmployeesService', () => {
  let service: EmployeesService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EmployeesService,
        {
          provide: IEmployeesRepository,
          useClass: EmployeesMockRepository,
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
