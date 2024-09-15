import { Routes } from '@angular/router';
import { AuthenticationPageComponent } from './pages/authentication-page/authentication-page.component';

export const routes: Routes = [
  { path: 'authentication', component: AuthenticationPageComponent },
  { path: '', redirectTo: '/authentication', pathMatch: 'full' },
];
