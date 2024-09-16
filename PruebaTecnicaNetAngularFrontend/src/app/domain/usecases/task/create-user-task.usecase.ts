import { Observable } from 'rxjs';
import { UseCase } from '../../../base/usecase';
import { Injectable } from '@angular/core';
import { UserTaskRepository } from '../../repositories/user-task/user-task.repository';
import { CreateUserTaskRequest } from '../../models/requests/task/create-user-task.request';
import { CreateUserTaskResponse } from '../../models/responses/task/create-user-task.response';

@Injectable({
  providedIn: 'root',
})
export class CreateUserTaskUseCase
  implements UseCase<CreateUserTaskRequest, CreateUserTaskResponse>
{
  constructor(private userTaskRepository: UserTaskRepository) {}

  execute(request: CreateUserTaskRequest): Observable<CreateUserTaskResponse> {
    return this.userTaskRepository.createUserTask(request);
  }
}
