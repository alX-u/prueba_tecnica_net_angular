import { Observable } from 'rxjs';
import { CreateUserRequest } from '../../models/requests/user/create-user.request';
import { CreateUserResponse } from '../../models/responses/user/create-user.response';
import { UserModel } from '../../models/user.model';
import { UpdateUserRequest } from '../../models/requests/user/update-user-request';

export abstract class UserRepository {
  abstract createUser(
    request: CreateUserRequest
  ): Observable<CreateUserResponse>;

  abstract getUsers(): Observable<UserModel[]>;

  abstract getEmployees(): Observable<UserModel[]>;

  abstract deleteUser(id: string): Observable<void>;

  abstract updateUser(id: string, request: UpdateUserRequest): Observable<void>;
}
