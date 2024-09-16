import { Routes } from '@angular/router';
import { AuthenticationPageComponent } from './pages/authentication-page/authentication-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { HomePageManageUsersComponent } from './pages/home-page/pages/manage-users/manage-users.component';
import { HomePageManageTasksComponent } from './pages/home-page/pages/manage-tasks/manage-tasks.component';

export const routes: Routes = [
  { path: 'authentication', component: AuthenticationPageComponent },
  {
    path: 'home',
    component: HomePageComponent,
    children: [
      {
        path: 'manage-users',
        component: HomePageManageUsersComponent,
      },
      { path: 'manage-tasks', component: HomePageManageTasksComponent },
    ],
  },
  { path: '', redirectTo: '/authentication', pathMatch: 'full' },
];
