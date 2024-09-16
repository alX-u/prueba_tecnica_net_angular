import { Observable } from 'rxjs';
import { UseCase } from '../../../base/usecase';
import { CreateUserRequest } from '../../models/requests/user/create-user.request';
import { CreateUserResponse } from '../../models/responses/user/create-user.response';
import { UserRepository } from '../../repositories/user/user.repository';
import { Injectable } from '@angular/core';
import { UserModel } from '../../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class GetUsersUseCase implements UseCase<void, UserModel[]> {
  constructor(private userRepository: UserRepository) {}

  execute(): Observable<UserModel[]> {
    return this.userRepository.getUsers();
  }
}
