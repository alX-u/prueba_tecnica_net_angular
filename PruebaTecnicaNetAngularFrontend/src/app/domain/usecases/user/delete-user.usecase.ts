import { Observable } from 'rxjs';
import { UseCase } from '../../../base/usecase';
import { CreateUserRequest } from '../../models/requests/user/create-user.request';
import { CreateUserResponse } from '../../models/responses/user/create-user.response';
import { UserRepository } from '../../repositories/user/user.repository';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DeleteUserUseCase implements UseCase<string, void> {
  constructor(private userRepository: UserRepository) {}

  execute(id: string): Observable<void> {
    return this.userRepository.deleteUser(id);
  }
}
