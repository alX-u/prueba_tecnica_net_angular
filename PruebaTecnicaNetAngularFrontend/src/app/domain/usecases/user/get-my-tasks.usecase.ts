import { Observable } from 'rxjs';
import { UseCase } from '../../../base/usecase';
import { CreateUserRequest } from '../../models/requests/user/create-user.request';
import { CreateUserResponse } from '../../models/responses/user/create-user.response';
import { UserRepository } from '../../repositories/user/user.repository';
import { Injectable } from '@angular/core';
import { UserModel } from '../../models/user.model';
import { UserTaskModel } from '../../models/user-task.model';

@Injectable({
  providedIn: 'root',
})
export class GetMyTasksUseCase implements UseCase<string, UserTaskModel[]> {
  constructor(private userRepository: UserRepository) {}

  execute(id: string): Observable<UserTaskModel[]> {
    return this.userRepository.getMyTasks(id);
  }
}
