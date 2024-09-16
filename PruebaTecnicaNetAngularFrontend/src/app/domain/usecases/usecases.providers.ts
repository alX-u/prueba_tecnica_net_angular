import { Provider } from '@angular/core';
import { UserRepository } from '../repositories/user/user.repository';
import { UserRepositoryImpl } from '../../data/repositories/user/user.repository.impl';
import { CreateUserUseCase } from './user/create-user.usecase';
import { LoginUseCase } from './auth/login.usecase';
import { AuthRepository } from '../repositories/auth/auth.repository';
import { AuthRepositoryImpl } from '../../data/repositories/auth/auth.repository.impl';
import { GetUsersUseCase } from './user/get-users-usecase';
import { GetUserRolesUseCase } from './user-role/get-user-roles.usecase';
import { UserRoleRepository } from '../repositories/user-role/user-role.repository';
import { UserRoleRepositoryImpl } from '../../data/repositories/user-role/user-role.repository.impl';
import { DeleteUserUseCase } from './user/delete-user.usecase';
import { UpdateUserUseCase } from './user/update-user.usecase';
import { GetUserRoleByIdUseCase } from './user-role/get-user-role-by-id.usecase';

export const useCaseProviders: Provider[] = [
  CreateUserUseCase,
  GetUsersUseCase,
  UpdateUserUseCase,
  DeleteUserUseCase,
  LoginUseCase,
  GetUserRolesUseCase,
  GetUserRoleByIdUseCase,
  { provide: UserRepository, useClass: UserRepositoryImpl },
  { provide: AuthRepository, useClass: AuthRepositoryImpl },
  { provide: UserRoleRepository, useClass: UserRoleRepositoryImpl },
];
