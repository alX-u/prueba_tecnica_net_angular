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
import { CreateUserTaskUseCase } from './task/create-user-task.usecase';
import { UserTaskRepository } from '../repositories/user-task/user-task.repository';
import { UserTaskRepositoryImpl } from '../../data/repositories/user-task/user-task.repository.impl';
import { GetUserTasksUseCase } from './task/get-user-tasks.usecase';
import { UpdateUserTaskUseCase } from './task/update-user-task.usecase';
import { DeleteUserTaskUseCase } from './task/delete-user-task.usecase';
import { GetEmployeesUseCase } from './user/get-employees.usecase';
import { GetMyTasksUseCase } from './user/get-my-tasks.usecase';

export const useCaseProviders: Provider[] = [
  CreateUserUseCase,
  GetUsersUseCase,
  GetEmployeesUseCase,
  GetMyTasksUseCase,
  UpdateUserUseCase,
  DeleteUserUseCase,
  LoginUseCase,
  GetUserRolesUseCase,
  GetUserRoleByIdUseCase,
  CreateUserTaskUseCase,
  GetUserTasksUseCase,
  UpdateUserTaskUseCase,
  DeleteUserTaskUseCase,
  { provide: UserRepository, useClass: UserRepositoryImpl },
  { provide: AuthRepository, useClass: AuthRepositoryImpl },
  { provide: UserRoleRepository, useClass: UserRoleRepositoryImpl },
  { provide: UserTaskRepository, useClass: UserTaskRepositoryImpl },
];
