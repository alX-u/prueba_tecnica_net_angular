import { Observable } from 'rxjs';
import { UseCase } from '../../../base/usecase';
import { UpdateUserRequest } from '../../models/requests/user/update-user-request';
import { UserRepository } from '../../repositories/user/user.repository';
import { Injectable } from '@angular/core';
import { UserTaskRepository } from '../../repositories/user-task/user-task.repository';
import { UpdateUserTaskRequest } from '../../models/requests/task/update-user-task.requests';

@Injectable({
  providedIn: 'root',
})
export class UpdateUserTaskUseCase
  implements UseCase<{ id: string; request: UpdateUserTaskRequest }, void>
{
  constructor(private userTaskRepository: UserTaskRepository) {}

  execute({
    id,
    request,
  }: {
    id: string;
    request: UpdateUserTaskRequest;
  }): Observable<void> {
    return this.userTaskRepository.updateUserTask(id, request);
  }
}
