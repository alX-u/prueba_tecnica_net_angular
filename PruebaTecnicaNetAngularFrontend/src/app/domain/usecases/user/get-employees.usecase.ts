import { Observable } from 'rxjs';
import { UseCase } from '../../../base/usecase';
import { UserRepository } from '../../repositories/user/user.repository';
import { Injectable } from '@angular/core';
import { UserModel } from '../../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class GetEmployeesUseCase implements UseCase<void, UserModel[]> {
  constructor(private userRepository: UserRepository) {}

  execute(): Observable<UserModel[]> {
    return this.userRepository.getEmployees();
  }
}
