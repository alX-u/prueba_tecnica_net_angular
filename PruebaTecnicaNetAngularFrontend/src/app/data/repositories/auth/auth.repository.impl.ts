import { AuthRepository } from './../../../domain/repositories/auth/auth.repository';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserRepository } from '../../../domain/repositories/user/user.repository';
import { CreateUserRequest } from '../../../domain/models/requests/user/create-user.request';
import { CreateUserResponse } from '../../../domain/models/responses/user/create-user.response';
import { LoginRequest } from '../../../domain/models/requests/auth/login.request';
import { LoginResponse } from '../../../domain/models/responses/auth/login.response';

@Injectable({
  providedIn: 'root',
})
export class AuthRepositoryImpl extends AuthRepository {
  constructor(private http: HttpClient) {
    super();
  }

  private apiUrl = 'http://localhost:5175';

  login(loginRequest: LoginRequest): Observable<LoginResponse> {
    var response = this.http.post<LoginResponse>(
      `${this.apiUrl}/auth/login`,
      loginRequest
    );

    return response;
  }
}
