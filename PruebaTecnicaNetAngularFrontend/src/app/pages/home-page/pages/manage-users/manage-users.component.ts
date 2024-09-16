import { Component, OnInit } from '@angular/core';
import { GetUsersUseCase } from '../../../../domain/usecases/user/get-users-usecase';
import { UserModel } from '../../../../domain/models/user.model';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButton } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { DeleteUserUseCase } from '../../../../domain/usecases/user/delete-user.usecase';
import { ManageUsersCreateUpdateUserComponent } from './components/create-update-user/create-update-user.component';
import { GetUserRoleByIdUseCase } from '../../../../domain/usecases/user-role/get-user-role-by-id.usecase';

@Component({
  selector: 'home-page-manage-users',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButton,
    RouterModule,
    ManageUsersCreateUpdateUserComponent,
  ],
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css'],
})
export class HomePageManageUsersComponent implements OnInit {
  constructor(
    private getUsersUseCase: GetUsersUseCase,
    private deleteUserUseCase: DeleteUserUseCase,
    private getUserRoleById: GetUserRoleByIdUseCase
  ) {}

  users: UserModel[] = [];
  displayedColumns: string[] = ['id', 'name', 'email', 'actions'];
  showCreateUserForm: boolean = false;
  showUsersList: boolean = true;
  userToEdit?: UserModel;

  ngOnInit(): void {
    this.getUsersUseCase.execute().subscribe((users) => {
      this.users = users;
    });
  }

  editUser(user: UserModel) {
    this.userToEdit = user;
    this.showUsersList = false;
    this.showCreateUserForm = true;
  }

  deleteUser(user: UserModel) {
    this.deleteUserUseCase.execute(user.id).subscribe(() => {
      this.ngOnInit();
    });
  }

  showCreateUserFormHandler() {
    this.userToEdit = undefined;
    this.showUsersList = false;
    this.showCreateUserForm = true;
  }

  handleUserCreated() {
    this.showCreateUserForm = false;
    this.showUsersList = true;
    this.ngOnInit();
  }
}
