import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  ValidatorFn,
  AbstractControl,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login-page',
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
  templateUrl: './authentication-page.component.html',
  styleUrl: './authentication-page.component.css',
})
export class AuthenticationPageComponent {
  // Login form
  loginForm = new FormGroup({
    emailLogin: new FormControl('', [Validators.required, Validators.email]),
    passwordLogin: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

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

  onLoginSubmit() {
    console.log(this.loginForm.value);
  }

  onRegisterSubmit() {
    console.log(this.registerForm.errors); // Verifica si el error de validación está presente
    console.log(this.registerForm.value);
  }
}
