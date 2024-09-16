import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { UserTaskModel } from '../../../../domain/models/user-task.model';
import { GetUserTasksUseCase } from '../../../../domain/usecases/task/get-user-tasks.usecase';
import { CreateUpdateTaskComponent } from './components/create-update-task/create-update-task.component';
import { DeleteUserTaskUseCase } from '../../../../domain/usecases/task/delete-user-task.usecase';

@Component({
  selector: 'home-page-manage-tasks',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButton,
    RouterModule,
    CreateUpdateTaskComponent,
  ],
  templateUrl: './manage-tasks.component.html',
  styleUrl: './manage-tasks.component.css',
})
export class HomePageManageTasksComponent {
  constructor(
    private getUserTasksUseCase: GetUserTasksUseCase,
    private deleteUserTaskUseCase: DeleteUserTaskUseCase
  ) {}

  tasks: UserTaskModel[] = [];
  displayedColumns = ['id', 'title', 'description', 'status', 'actions'];
  showUserTaskForm: boolean = false;
  showTasksList: boolean = true;
  taskToEdit?: UserTaskModel;

  ngOnInit(): void {
    this.getUserTasksUseCase.execute().subscribe((tasks) => {
      this.tasks = tasks;
    });
  }

  editTask(task: UserTaskModel) {
    this.taskToEdit = task;
    this.showTasksList = false;
    this.showUserTaskForm = true;
  }

  deleteTask(task: UserTaskModel) {
    this.deleteUserTaskUseCase.execute(task.id).subscribe(() => {
      this.ngOnInit();
    });
  }

  showCreateUserTaskFormHandler() {
    this.taskToEdit = undefined;
    this.showTasksList = false;
    this.showUserTaskForm = true;
  }

  handleUserTaskCreated() {
    this.showUserTaskForm = false;
    this.showTasksList = true;
    this.ngOnInit();
  }
}
