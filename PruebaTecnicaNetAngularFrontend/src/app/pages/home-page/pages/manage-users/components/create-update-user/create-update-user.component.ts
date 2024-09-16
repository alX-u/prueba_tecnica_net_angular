import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { CreateUserRequest } from '../../../../../../domain/models/requests/user/create-user.request';
import { CreateUserUseCase } from '../../../../../../domain/usecases/user/create-user.usecase';
import { GetUserRolesUseCase } from '../../../../../../domain/usecases/user-role/get-user-roles.usecase';
import { UserRoleModel } from '../../../../../../domain/models/user-role.model';
import { MatOption } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { UserModel } from '../../../../../../domain/models/user.model';
import { CommonModule } from '@angular/common';
import { UpdateUserUseCase } from '../../../../../../domain/usecases/user/update-user.usecase';
import { UpdateUserRequest } from '../../../../../../domain/models/requests/user/update-user-request';

@Component({
  selector: 'manage-users-create-update-user',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatCheckboxModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatOption,
    MatSelectModule,
  ],
  templateUrl: './create-update-user.component.html',
  styleUrls: ['./create-update-user.component.css'],
})
export class ManageUsersCreateUpdateUserComponent implements OnInit {
  @Input() user?: UserModel;
  @Output() userCreated = new EventEmitter<void>();

  constructor(
    private createUserUseCase: CreateUserUseCase,
    private getUserRolesUseCase: GetUserRolesUseCase,
    private updateUserUseCase: UpdateUserUseCase
  ) {}

  userRoles: UserRoleModel[] = [];

  // Register form
  registerForm = new FormGroup({
    fullNameRegister: new FormControl('', Validators.required),
    emailRegister: new FormControl('', [Validators.required, Validators.email]),
    roleRegister: new FormControl('', Validators.required),
    passwordRegister: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    confirmPasswordRegister: new FormControl('', [
      Validators.required,
      this.confirmPasswordValidator.bind(this),
    ]),
  });

  ngOnInit(): void {
    this.getUserRolesUseCase.execute().subscribe((userRoles) => {
      this.userRoles = userRoles;
    });

    if (this.user) {
      this.registerForm.patchValue({
        fullNameRegister: this.user.name,
        emailRegister: this.user.email,
        roleRegister: this.user.roleId,
      });

      this.registerForm.get('passwordRegister')?.clearValidators();
      this.registerForm.get('confirmPasswordRegister')?.clearValidators();
      this.registerForm.get('passwordRegister')?.updateValueAndValidity();
      this.registerForm
        .get('confirmPasswordRegister')
        ?.updateValueAndValidity();
    }
  }

  // Password match validator for register form
  confirmPasswordValidator(
    control: AbstractControl
  ): { [key: string]: boolean } | null {
    const form = control.parent as FormGroup;
    if (!form) {
      return null;
    }
    const password = form.get('passwordRegister')?.value;
    const confirmPassword = control.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  onRegisterSubmit() {
    const formAnswers = this.registerForm.value;

    if (this.user) {
      const updateUserRequest: UpdateUserRequest = {
        name: formAnswers.fullNameRegister ?? '',
        email: formAnswers.emailRegister ?? '',
        password: formAnswers.passwordRegister ?? '',
        roleId: formAnswers.roleRegister ?? '',
      };
      this.updateUserUseCase
        .execute({ id: this.user.id, request: updateUserRequest })
        .subscribe({
          next: () => {
            this.userCreated.emit();
          },
          error: (error) => {
            console.log(error);
          },
        });
    } else {
      const createUserRequest: CreateUserRequest = {
        name: formAnswers.fullNameRegister ?? '',
        email: formAnswers.emailRegister ?? '',
        password: formAnswers.passwordRegister ?? '',
        roleId: formAnswers.roleRegister ?? '',
      };

      this.createUserUseCase.execute(createUserRequest).subscribe({
        next: () => {
          this.userCreated.emit();
        },
        error: (error) => {
          console.log(error);
        },
      });
    }
  }
}
