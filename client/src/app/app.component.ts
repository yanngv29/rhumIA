import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { User } from './models/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  currentUser: User | null = null;
  
  constructor(
    private router: Router,
    private authService: AuthService
  ) {
    this.authService.currentUser.subscribe(user => this.currentUser = user);
  }
  
  logout() {
    this.authService.logout().subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: error => {
        console.error('Logout failed:', error);
        // Force logout even if API call fails
        localStorage.removeItem('currentUser');
        this.router.navigate(['/login']);
      }
    });
  }
}