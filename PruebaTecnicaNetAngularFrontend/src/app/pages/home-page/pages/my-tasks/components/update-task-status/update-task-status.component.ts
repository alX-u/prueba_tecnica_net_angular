import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
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
import { UpdateUserTaskRequest } from '../../../../../../domain/models/requests/task/update-user-task.requests';
import { UserTaskModel } from '../../../../../../domain/models/user-task.model';
import { UserModel } from '../../../../../../domain/models/user.model';
import { UpdateUserTaskUseCase } from '../../../../../../domain/usecases/task/update-user-task.usecase';
import { GetEmployeesUseCase } from '../../../../../../domain/usecases/user/get-employees.usecase';

@Component({
  selector: 'my-tasks-update-task-status',
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
  templateUrl: './update-task-status.component.html',
  styleUrl: './update-task-status.component.css',
})
export class MyTasksUpdateTaskStatusComponent {
  @Input() task?: UserTaskModel;
  @Output() userTaskCreated = new EventEmitter<void>();

  constructor(
    private getEmployeesUseCase: GetEmployeesUseCase,
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
    this.getEmployeesUseCase.execute().subscribe((users) => {
      this.users = users;
    });

    if (this.task) {
      this.taskForm.patchValue({
        title: this.task.title,
        description: this.task.description,
        status: this.task.status,
        assignedTo: this.task.assignedTo,
      });

      this.taskForm.get('title')?.disable();
      this.taskForm.get('description')?.disable();
      this.taskForm.get('assignedTo')?.disable();
    }
  }

  onSubmit() {
    this.taskForm.get('title')?.enable();
    this.taskForm.get('description')?.enable();
    this.taskForm.get('assignedTo')?.enable();

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
    }
  }
}
