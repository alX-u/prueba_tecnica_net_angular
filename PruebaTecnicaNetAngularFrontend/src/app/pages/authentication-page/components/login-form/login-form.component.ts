import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { LoginUseCase } from '../../../../domain/usecases/auth/login.usecase';
import { LoginRequest } from '../../../../domain/models/requests/auth/login.request';

@Component({
  selector: 'authentication-page-login-form',
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
  ],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css',
})
export class LoginFormComponent {
  constructor(private loginUseCase: LoginUseCase) {}

  // Login form
  loginForm = new FormGroup({
    emailLogin: new FormControl('', [Validators.required, Validators.email]),
    passwordLogin: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  onLoginSubmit() {
    const formAnswers = this.loginForm.value;

    const loginRequest: LoginRequest = {
      email: formAnswers.emailLogin ?? '',
      password: formAnswers.passwordLogin ?? '',
    };

    this.loginUseCase.execute(loginRequest).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
