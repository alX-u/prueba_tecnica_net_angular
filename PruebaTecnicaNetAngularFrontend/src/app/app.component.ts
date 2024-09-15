import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CreateUserUseCase } from './domain/usecases/user/create-user.usecase';
import { UserRepository } from './domain/repositories/user/user.repository';
import { UserRepositoryImpl } from './data/repositories/user/user.repository.impl';
import { useCaseProviders } from './domain/usecases/usecases.providers';

@Component({
  selector: 'app-root',
  standalone: true,
  providers: [...useCaseProviders],
  imports: [RouterOutlet, RouterLink, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'PruebaTecnicaNetAngularFrontend';
}
