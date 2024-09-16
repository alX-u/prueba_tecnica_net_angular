import { Observable } from 'rxjs';
import { UseCase } from '../../../base/usecase';
import { Injectable } from '@angular/core';
import { UserRoleModel } from '../../models/user-role.model';
import { UserRoleRepository } from '../../repositories/user-role/user-role.repository';

@Injectable({
  providedIn: 'root',
})
export class GetUserRoleByIdUseCase implements UseCase<string, string> {
  constructor(private userRoleRepository: UserRoleRepository) {}

  execute(id: string): Observable<string> {
    return this.userRoleRepository.getUserRoleById(id);
  }
}
