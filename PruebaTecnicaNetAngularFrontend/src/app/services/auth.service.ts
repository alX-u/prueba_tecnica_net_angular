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
  }>({
    isLoggedIn: false,
    token: null,
    role: null,
  });

  getUserStatus(): Observable<{
    isLoggedIn: boolean;
    token: string | null;
    role: string | null;
  }> {
    return this.userStatusSubject.asObservable();
  }

  login(token: string, role: string): Observable<void> {
    this.userStatusSubject.next({ isLoggedIn: true, token, role });
    return of(void 0);
  }

  logout(): Observable<void> {
    this.userStatusSubject.next({ isLoggedIn: false, token: null, role: null });
    return of(void 0);
  }
}
