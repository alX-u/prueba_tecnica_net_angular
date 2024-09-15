import { Provider } from '@angular/core';
import { UserRepository } from '../repositories/user/user.repository';
import { UserRepositoryImpl } from '../../data/repositories/user/user.repository.impl';
import { CreateUserUseCase } from './user/create-user.usecase';
import { LoginUseCase } from './auth/login.usecase';
import { AuthRepository } from '../repositories/auth/auth.repository';
import { AuthRepositoryImpl } from '../../data/repositories/auth/auth.repository.impl';

export const useCaseProviders: Provider[] = [
  CreateUserUseCase,
  LoginUseCase,
  { provide: UserRepository, useClass: UserRepositoryImpl },
  { provide: AuthRepository, useClass: AuthRepositoryImpl },
];
