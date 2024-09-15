import { Observable } from 'rxjs';
import { CreateUserRequest } from '../../models/requests/user/create-user.request';
import { CreateUserResponse } from '../../models/responses/user/create-user.response';

export abstract class UserRepository {
  abstract createUser(
    request: CreateUserRequest
  ): Observable<CreateUserResponse>;
}
