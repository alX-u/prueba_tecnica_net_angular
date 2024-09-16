import { Observable } from 'rxjs';
import { CreateUserRequest } from '../../models/requests/user/create-user.request';
import { CreateUserResponse } from '../../models/responses/user/create-user.response';
import { UserModel } from '../../models/user.model';
import { UserRoleModel } from '../../models/user-role.model';
import { UserTaskModel } from '../../models/user-task.model';
import { CreateUserTaskRequest } from '../../models/requests/task/create-user-task.request';
import { CreateUserTaskResponse } from '../../models/responses/task/create-user-task.response';
import { UpdateUserTaskRequest } from '../../models/requests/task/update-user-task.requests';

export abstract class UserTaskRepository {
  abstract createUserTask(
    request: CreateUserTaskRequest
  ): Observable<CreateUserTaskResponse>;

  abstract getUserTasks(): Observable<UserTaskModel[]>;

  abstract getUserTask(id: string): Observable<UserTaskModel>;

  abstract updateUserTask(
    id: string,
    request: UpdateUserTaskRequest
  ): Observable<void>;

  abstract deleteUserTask(id: string): Observable<void>;
}
