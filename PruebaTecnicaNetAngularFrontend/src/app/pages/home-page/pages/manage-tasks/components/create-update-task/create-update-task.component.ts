import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatOption } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { UserTaskModel } from '../../../../../../domain/models/user-task.model';
import { GetUsersUseCase } from '../../../../../../domain/usecases/user/get-users-usecase';
import { UserModel } from '../../../../../../domain/models/user.model';
import { CreateUserTaskUseCase } from '../../../../../../domain/usecases/task/create-user-task.usecase';
import { UpdateUserTaskUseCase } from '../../../../../../domain/usecases/task/update-user-task.usecase';
import { UpdateUserTaskRequest } from '../../../../../../domain/models/requests/task/update-user-task.requests';
import { CreateUserTaskRequest } from '../../../../../../domain/models/requests/task/create-user-task.request';

@Component({
  selector: 'manage-tasks-create-update-task',
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
  templateUrl: './create-update-task.component.html',
  styleUrl: './create-update-task.component.css',
})
export class CreateUpdateTaskComponent {
  @Input() task?: UserTaskModel;
  @Output() userTaskCreated = new EventEmitter<void>();

  constructor(
    private getUsersUseCase: GetUsersUseCase,
    private createUserTaskUseCase: CreateUserTaskUseCase,
    private updateUserTaskUseCase: UpdateUserTaskUseCase
  ) {}

  taskStatusList: string[] = ['Pendiente', 'En Proceso', 'Completada'];
  users: UserModel[] = [];

  // Task form
  taskForm = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('', [Validators.required]),
    status: new FormControl(0, Validators.required),
    assignedTo: new FormControl(''),
  });

  ngOnInit(): void {
    this.getUsersUseCase.execute().subscribe((users) => {
      this.users = users;
    });

    if (this.task) {
      this.taskForm.patchValue({
        title: this.task.title,
        description: this.task.description,
        status: this.task.status,
        assignedTo: this.task.assignedTo,
      });
    }
  }

  onSubmit() {
    const formAnswers = this.taskForm.value;

    if (this.task) {
      const updateUserTaskRequest: UpdateUserTaskRequest = {
        title: formAnswers.title ?? '',
        description: formAnswers.description ?? '',
        status: formAnswers.status ?? 0,
        assignedTo: formAnswers.assignedTo ?? '',
      };
      this.updateUserTaskUseCase
        .execute({ id: this.task.id, request: updateUserTaskRequest })
        .subscribe({
          next: () => {
            this.userTaskCreated.emit();
          },
          error: (error) => {
            console.log(error);
          },
        });
    } else {
      const createUserTaskRequest: CreateUserTaskRequest = {
        title: formAnswers.title ?? '',
        description: formAnswers.description ?? '',
        status: formAnswers.status ?? 0,
        assignedTo: formAnswers.assignedTo ?? '',
      };

      this.createUserTaskUseCase.execute(createUserTaskRequest).subscribe({
        next: () => {
          this.userTaskCreated.emit();
        },
        error: (error) => {
          console.log(error);
        },
      });
    }
  }
}
