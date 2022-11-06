import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { EmployeesService } from 'src/employees/employees.service';
import { RolesGuard } from './roles.guard';

@Injectable()
export class RestrictToUserGuard extends RolesGuard implements CanActivate {
  constructor(
    protected reflector: Reflector,
    protected employeesService: EmployeesService,
  ) {
    super(reflector, employeesService);
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isEligible = await super.canActivate(context);
    if (!isEligible) {
      const request = context.switchToHttp().getRequest();
      const employeeEmail = request.user.email;
      return request.params.email === employeeEmail;
    }

    return true;
  }
}
