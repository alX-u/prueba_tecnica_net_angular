import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { LoginFormComponent } from '../login-form/login-form.component';
import { CreateUserUseCase } from '../../../../domain/usecases/user/create-user.usecase';
import { CreateUserRequest } from '../../../../domain/models/requests/user/create-user.request';

@Component({
  selector: 'authentication-page-register-form',
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
    LoginFormComponent,
  ],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.css',
})
export class RegisterFormComponent {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  // Register form
  registerForm = new FormGroup({
    fullNameRegister: new FormControl('', Validators.required),
    emailRegister: new FormControl('', [Validators.required, Validators.email]),
    passwordRegister: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    confirmPasswordRegister: new FormControl('', [
      Validators.required,
      this.confirmPasswordValidator.bind(this),
    ]),
  });

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

    const createUserRequest: CreateUserRequest = {
      name: formAnswers.fullNameRegister ?? '',
      email: formAnswers.emailRegister ?? '',
      password: formAnswers.passwordRegister ?? '',
      roleId: null,
    };

    this.createUserUseCase.execute(createUserRequest).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
