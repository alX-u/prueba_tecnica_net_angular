import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserRepository } from '../../../domain/repositories/user/user.repository';
import { CreateUserRequest } from '../../../domain/models/requests/user/create-user.request';
import { CreateUserResponse } from '../../../domain/models/responses/user/create-user.response';
import { UserModel } from '../../../domain/models/user.model';
import { AuthService } from '../../../services/auth.service';
import { UserRoleRepository } from '../../../domain/repositories/user-role/user-role.repository';
import { UserRoleModel } from '../../../domain/models/user-role.model';

@Injectable({
  providedIn: 'root',
})
export class UserRoleRepositoryImpl extends UserRoleRepository {
  private apiUrl = 'http://localhost:5175';
  private token: string | null = null;

  constructor(private http: HttpClient, private authService: AuthService) {
    super();
    this.authService.getUserStatus().subscribe((status) => {
      this.token = status.token;
    });
  }

  override getUserRoles(): Observable<UserRoleModel[]> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });

    var response = this.http.get<UserRoleModel[]>(`${this.apiUrl}/roles`, {
      headers,
    });
    return response;
  }

  override getUserRoleById(id: string): Observable<string> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });

    var response = this.http.get<string>(`${this.apiUrl}/roles/${id}`, {
      headers,
    });
    return response;
  }
}
