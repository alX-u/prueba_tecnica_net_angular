import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserRepository } from '../../../domain/repositories/user/user.repository';
import { CreateUserRequest } from '../../../domain/models/requests/user/create-user.request';
import { CreateUserResponse } from '../../../domain/models/responses/user/create-user.response';

@Injectable({
  providedIn: 'root',
})
export class UserRepositoryImpl extends UserRepository {
  private apiUrl = 'http://localhost:5175';

  constructor(private http: HttpClient) {
    super();
  }

  createUser(request: CreateUserRequest): Observable<CreateUserResponse> {
    var response = this.http.post<CreateUserResponse>(
      `${this.apiUrl}/users`,
      request
    );
    return response;
  }
}
