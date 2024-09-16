import { Observable } from 'rxjs';
import { UseCase } from '../../../base/usecase';
import { Injectable } from '@angular/core';
import { UserTaskRepository } from '../../repositories/user-task/user-task.repository';
import { UserTaskModel } from '../../models/user-task.model';

@Injectable({
  providedIn: 'root',
})
export class GetUserTasksUseCase implements UseCase<void, UserTaskModel[]> {
  constructor(private userTaskRepository: UserTaskRepository) {}

  execute(): Observable<UserTaskModel[]> {
    return this.userTaskRepository.getUserTasks();
  }
}
