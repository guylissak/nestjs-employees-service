import { Employee } from '../employee.entity';

export abstract class IEmployeesRepository {
  abstract create(attrs: Partial<Employee>): Promise<Employee>;
  abstract save(employee: Employee): Promise<Employee>;
  abstract remove(email: string): Promise<Employee>;
  abstract findOne(email: string): Promise<Employee>;
  abstract find(): Promise<Employee[]>;
}
