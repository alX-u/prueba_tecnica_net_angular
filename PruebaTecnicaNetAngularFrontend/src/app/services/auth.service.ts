import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userStatusSubject = new BehaviorSubject<{
    isLoggedIn: boolean;
    token: string | null;
    role: string | null;
    id: string | null;
  }>({
    isLoggedIn: false,
    token: null,
    role: null,
    id: null,
  });

  getUserStatus(): Observable<{
    isLoggedIn: boolean;
    token: string | null;
    role: string | null;
    id: string | null;
  }> {
    return this.userStatusSubject.asObservable();
  }

  login(token: string, role: string, id: string): Observable<void> {
    this.userStatusSubject.next({ isLoggedIn: true, token, role, id });
    return of(void 0);
  }

  logout(): Observable<void> {
    this.userStatusSubject.next({
      isLoggedIn: false,
      token: null,
      role: null,
      id: null,
    });
    return of(void 0);
  }
}
