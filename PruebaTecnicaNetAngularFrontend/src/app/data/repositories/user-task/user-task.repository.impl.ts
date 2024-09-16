import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserRepository } from '../../../domain/repositories/user/user.repository';
import { CreateUserRequest } from '../../../domain/models/requests/user/create-user.request';
import { CreateUserResponse } from '../../../domain/models/responses/user/create-user.response';
import { UserModel } from '../../../domain/models/user.model';
import { AuthService } from '../../../services/auth.service';
import { UpdateUserRequest } from '../../../domain/models/requests/user/update-user-request';
import { UserTaskRepository } from '../../../domain/repositories/user-task/user-task.repository';
import { CreateUserTaskRequest } from '../../../domain/models/requests/task/create-user-task.request';
import { UpdateUserTaskRequest } from '../../../domain/models/requests/task/update-user-task.requests';
import { CreateUserTaskResponse } from '../../../domain/models/responses/task/create-user-task.response';
import { UserTaskModel } from '../../../domain/models/user-task.model';

@Injectable({
  providedIn: 'root',
})
export class UserTaskRepositoryImpl extends UserTaskRepository {
  private apiUrl = 'http://localhost:5175';
  private token: string | null = null;

  constructor(private http: HttpClient, private authService: AuthService) {
    super();
    this.authService.getUserStatus().subscribe((status) => {
      this.token = status.token;
    });
  }

  createUserTask(
    request: CreateUserTaskRequest
  ): Observable<CreateUserTaskResponse> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });

    var response = this.http.post<CreateUserTaskResponse>(
      `${this.apiUrl}/tasks`,
      request,
      {
        headers,
      }
    );
    return response;
  }

  getUserTasks(): Observable<UserTaskModel[]> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });

    var response = this.http.get<UserTaskModel[]>(`${this.apiUrl}/tasks`, {
      headers,
    });
    return response;
  }

  getUserTask(id: string): Observable<UserTaskModel> {
    throw new Error('Method not implemented.');
  }

  updateUserTask(id: string, request: UpdateUserTaskRequest): Observable<void> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });

    var response = this.http.put<void>(`${this.apiUrl}/tasks/${id}`, request, {
      headers,
    });
    return response;
  }

  deleteUserTask(id: string): Observable<void> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });

    var response = this.http.delete<void>(`${this.apiUrl}/tasks/${id}`, {
      headers,
    });
    return response;
  }
}
