import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { User, UserLogin, UserRegister, AuthResponse } from '../models/user.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;
  private apiUrl = `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient) {
    const storedUser = localStorage.getItem('currentUser');
    this.currentUserSubject = new BehaviorSubject<User | null>(
      storedUser ? JSON.parse(storedUser) : null
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  register(user: UserRegister): Observable<User> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, user)
      .pipe(
        map(response => {
          // Store user details and jwt token in local storage to keep user logged in
          const user = response.user;
          user.token = response.token;
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
          return user;
        }),
        catchError(error => {
          return throwError(() => error);
        })
      );
  }

  login(credentials: UserLogin): Observable<User> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, credentials)
      .pipe(
        map(response => {
          // Store user details and jwt token in local storage to keep user logged in
          const user = response.user;
          user.token = response.token;
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
          return user;
        }),
        catchError(error => {
          return throwError(() => error);
        })
      );
  }

  logout(): Observable<any> {
    return this.http.get(`${this.apiUrl}/logout`)
      .pipe(
        map(() => {
          // Remove user from local storage
          localStorage.removeItem('currentUser');
          this.currentUserSubject.next(null);
        }),
        catchError(error => {
          // Even if the API call fails, clear the local user
          localStorage.removeItem('currentUser');
          this.currentUserSubject.next(null);
          return throwError(() => error);
        })
      );
  }

  isLoggedIn(): boolean {
    return !!this.currentUserValue;
  }
}