import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  isLoggedIn = false;

  constructor(private authService: AuthService) {
    this.authService.currentUser.subscribe(user => {
      this.isLoggedIn = !!user;
    });
  }
}