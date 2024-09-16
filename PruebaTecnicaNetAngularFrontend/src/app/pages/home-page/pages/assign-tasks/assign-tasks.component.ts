import { Component } from '@angular/core';
import { UserTaskModel } from '../../../../domain/models/user-task.model';
import { GetUserTasksUseCase } from '../../../../domain/usecases/task/get-user-tasks.usecase';
import { CommonModule } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { CreateUpdateTaskComponent } from '../manage-tasks/components/create-update-task/create-update-task.component';
import { UpdateEmployeesTaskComponent } from './components/update-employees-task/update-employees-task.component';

@Component({
  selector: 'home-page-assign-tasks',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButton,
    RouterModule,
    CreateUpdateTaskComponent,
    UpdateEmployeesTaskComponent,
  ],
  templateUrl: './assign-tasks.component.html',
  styleUrl: './assign-tasks.component.css',
})
export class HomePageAssignTasksComponent {
  constructor(private getUserTasksUseCase: GetUserTasksUseCase) {}

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

  handleUserTaskCreated() {
    this.showUserTaskForm = false;
    this.showTasksList = true;
    this.ngOnInit();
  }
}
