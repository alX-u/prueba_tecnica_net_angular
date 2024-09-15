import { Observable } from 'rxjs';
import { LoginRequest } from '../../models/requests/auth/login.request';
import { LoginResponse } from '../../models/responses/auth/login.response';

export abstract class AuthRepository {
  abstract login(loginRequest: LoginRequest): Observable<LoginResponse>;
}
