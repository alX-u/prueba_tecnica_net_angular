import { Observable } from 'rxjs';
import { UseCase } from '../../../base/usecase';
import { UpdateUserRequest } from '../../models/requests/user/update-user-request';
import { UserRepository } from '../../repositories/user/user.repository';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UpdateUserUseCase
  implements UseCase<{ id: string; request: UpdateUserRequest }, void>
{
  constructor(private userRepository: UserRepository) {}

  execute({
    id,
    request,
  }: {
    id: string;
    request: UpdateUserRequest;
  }): Observable<void> {
    return this.userRepository.updateUser(id, request);
  }
}
