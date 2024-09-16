import { Component } from '@angular/core';
import { UserTaskModel } from '../../../../domain/models/user-task.model';
import { GetMyTasksUseCase } from '../../../../domain/usecases/user/get-my-tasks.usecase';
import { AuthService } from '../../../../services/auth.service';
import { CommonModule } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { UpdateEmployeesTaskComponent } from '../assign-tasks/components/update-employees-task/update-employees-task.component';
import { CreateUpdateTaskComponent } from '../manage-tasks/components/create-update-task/create-update-task.component';
import { MyTasksUpdateTaskStatusComponent } from './components/update-task-status/update-task-status.component';

@Component({
  selector: 'home-page-my-tasks',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButton,
    RouterModule,
    CreateUpdateTaskComponent,
    UpdateEmployeesTaskComponent,
    MyTasksUpdateTaskStatusComponent,
  ],
  templateUrl: './my-tasks.component.html',
  styleUrl: './my-tasks.component.css',
})
export class HomePageMyTasksComponent {
  constructor(
    private getMyTasksUseCase: GetMyTasksUseCase,
    private authService: AuthService
  ) {}

  tasks: UserTaskModel[] = [];
  displayedColumns = ['id', 'title', 'description', 'status', 'actions'];
  showUserTaskForm: boolean = false;
  showTasksList: boolean = true;
  taskToEdit?: UserTaskModel;
  userId: string | null = null;

  ngOnInit(): void {
    this.authService.getUserStatus().subscribe((status) => {
      this.userId = status.id;
      console.log(this.userId);
    });

    this.getMyTasksUseCase.execute(this.userId ?? '').subscribe((tasks) => {
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
