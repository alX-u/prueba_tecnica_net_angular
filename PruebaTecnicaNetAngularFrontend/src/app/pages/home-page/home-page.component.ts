import { MatToolbar } from '@angular/material/toolbar';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import { HomePageManageUsersComponent } from './pages/manage-users/manage-users.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbar,
    MatButtonModule,
    RouterModule,
    HomePageManageUsersComponent,
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  isLoggedIn: boolean = false;
  role: string | null = null;
  token: string | null = null;

  ngOnInit(): void {
    this.authService.getUserStatus().subscribe((status) => {
      this.isLoggedIn = status.isLoggedIn;
      this.role = status.role;
      this.token = status.token;
    });
  }

  logout(): void {
    this.authService.logout().subscribe({
      complete: () => {
        this.isLoggedIn = false;
        this.role = null;
        this.token = null;
        this.router.navigate(['/authentication']);
      },
    });
  }
}
