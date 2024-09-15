import { Observable } from 'rxjs';
import { UseCase } from '../../../base/usecase';
import { CreateUserRequest } from '../../models/requests/user/create-user.request';
import { CreateUserResponse } from '../../models/responses/user/create-user.response';
import { UserRepository } from '../../repositories/user/user.repository';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CreateUserUseCase
  implements UseCase<CreateUserRequest, CreateUserResponse>
{
  constructor(private userRepository: UserRepository) {}

  execute(request: CreateUserRequest): Observable<CreateUserResponse> {
    return this.userRepository.createUser(request);
  }
}
