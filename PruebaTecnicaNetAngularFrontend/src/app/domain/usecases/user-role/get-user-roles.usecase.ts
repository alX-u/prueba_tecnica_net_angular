import { Observable } from 'rxjs';
import { UseCase } from '../../../base/usecase';
import { Injectable } from '@angular/core';
import { UserRoleModel } from '../../models/user-role.model';
import { UserRoleRepository } from '../../repositories/user-role/user-role.repository';

@Injectable({
  providedIn: 'root',
})
export class GetUserRolesUseCase implements UseCase<void, UserRoleModel[]> {
  constructor(private userRoleRepository: UserRoleRepository) {}

  execute(): Observable<UserRoleModel[]> {
    return this.userRoleRepository.getUserRoles();
  }
}
