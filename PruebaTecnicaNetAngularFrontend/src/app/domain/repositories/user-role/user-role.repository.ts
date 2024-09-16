import { Observable } from 'rxjs';
import { CreateUserRequest } from '../../models/requests/user/create-user.request';
import { CreateUserResponse } from '../../models/responses/user/create-user.response';
import { UserModel } from '../../models/user.model';
import { UserRoleModel } from '../../models/user-role.model';

export abstract class UserRoleRepository {
  abstract getUserRoles(): Observable<UserRoleModel[]>;

  abstract getUserRoleById(id: string): Observable<string>;
}
