import { Observable } from 'rxjs';
import { UseCase } from '../../../base/usecase';
import { CreateUserRequest } from '../../models/requests/user/create-user.request';
import { CreateUserResponse } from '../../models/responses/user/create-user.response';
import { UserRepository } from '../../repositories/user/user.repository';
import { Injectable } from '@angular/core';
import { LoginRequest } from '../../models/requests/auth/login.request';
import { LoginResponse } from '../../models/responses/auth/login.response';
import { AuthRepository } from '../../repositories/auth/auth.repository';

@Injectable({
  providedIn: 'root',
})
export class LoginUseCase implements UseCase<LoginRequest, LoginResponse> {
  constructor(private authRepository: AuthRepository) {}

  execute(request: LoginRequest): Observable<LoginResponse> {
    return this.authRepository.login(request);
  }
}
