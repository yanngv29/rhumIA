import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          // Auto logout if 401 response returned from API
          this.authService.logout().subscribe({
            next: () => {
              this.router.navigate(['/login'], { 
                queryParams: { returnUrl: this.router.url, error: 'session-expired' } 
              });
            },
            error: () => {
              // Force logout even if API call fails
              localStorage.removeItem('currentUser');
              this.router.navigate(['/login'], { 
                queryParams: { returnUrl: this.router.url, error: 'session-expired' } 
              });
            }
          });
        }
        
        // Handle other types of errors
        const errorMessage = error.error?.message || error.statusText || 'Unknown error';
        
        // Log the error for debugging
        console.error('API Error:', error);
        
        // Pass the error along
        return throwError(() => error);
      })
    );
  }
}