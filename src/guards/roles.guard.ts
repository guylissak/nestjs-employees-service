import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { EmployeesService } from 'src/employees/employees.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private employeesService: EmployeesService,
  ) {}

  private matchRoles(roles: string[], userRole: string): boolean {
    return roles.includes(userRole);
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    console.log('roles', roles);
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const employeeEmail = request.user.email;
    const employee = await this.employeesService.findOne(employeeEmail);
    return this.matchRoles(roles, employee.role);
  }
}
