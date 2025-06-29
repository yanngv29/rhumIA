import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { User, UserLogin, UserRegister } from '../models/user.model';
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
    return this.http.post<any>(`${this.apiUrl}/register`, user)
      .pipe(
        map(response => {
          // Create user object from registration data and token
          const loggedInUser: User = {
            username: user.name,  // Map name (sent to backend) to username (used in frontend)
            email: user.email,
            token: response.token
          };
          
          // Store user details and jwt token in local storage
          localStorage.setItem('currentUser', JSON.stringify(loggedInUser));
          this.currentUserSubject.next(loggedInUser);
          return loggedInUser;
        }),
        catchError(error => {
          return throwError(() => error);
        })
      );
  }

  login(credentials: UserLogin): Observable<User> {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials)
      .pipe(
        map(response => {
          // Create user object from login data and token
          const loggedInUser: User = {
            username: credentials.email.split('@')[0], // Temporary username from email
            email: credentials.email,
            token: response.token // Store the token from the response
          };
          
          // Store user details and token in local storage
          localStorage.setItem('currentUser', JSON.stringify(loggedInUser));
          this.currentUserSubject.next(loggedInUser);
          return loggedInUser;
        }),
        catchError(error => {
          return throwError(() => error);
        })
      );
  }

  logout(): Observable<any> {
    // Call the logout endpoint
    return this.http.post<any>(`${this.apiUrl}/logout`, {}).pipe(
      map(() => {
        // Remove user from local storage
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
      }),
      catchError(error => {
        // Even if the API call fails, clear the local user data
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