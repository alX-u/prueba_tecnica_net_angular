import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserRepository } from '../../../domain/repositories/user/user.repository';
import { CreateUserRequest } from '../../../domain/models/requests/user/create-user.request';
import { CreateUserResponse } from '../../../domain/models/responses/user/create-user.response';
import { UserModel } from '../../../domain/models/user.model';
import { AuthService } from '../../../services/auth.service';
import { UpdateUserRequest } from '../../../domain/models/requests/user/update-user-request';

@Injectable({
  providedIn: 'root',
})
export class UserRepositoryImpl extends UserRepository {
  private apiUrl = 'http://localhost:5175';
  private token: string | null = null;

  constructor(private http: HttpClient, private authService: AuthService) {
    super();
    this.authService.getUserStatus().subscribe((status) => {
      this.token = status.token;
    });
  }

  createUser(request: CreateUserRequest): Observable<CreateUserResponse> {
    var response = this.http.post<CreateUserResponse>(
      `${this.apiUrl}/users`,
      request
    );
    return response;
  }

  getUsers(): Observable<UserModel[]> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });

    var response = this.http.get<UserModel[]>(`${this.apiUrl}/users`, {
      headers,
    });
    return response;
  }

  getEmployees(): Observable<UserModel[]> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });

    var response = this.http.get<UserModel[]>(
      `${this.apiUrl}/users/employees`,
      {
        headers,
      }
    );
    return response;
  }

  updateUser(id: string, request: UpdateUserRequest): Observable<void> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });
    var response = this.http.put<void>(`${this.apiUrl}/users/${id}`, request, {
      headers,
    });
    return response;
  }

  deleteUser(id: string): Observable<void> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });

    var response = this.http.delete<void>(`${this.apiUrl}/users/${id}`, {
      headers,
    });
    return response;
  }
}
