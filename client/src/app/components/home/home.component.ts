import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Rhum } from '../../models/rhum.model';
import { RhumService } from '../../services/rhum.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  isLoggedIn = false;
  randomRhums: Rhum[] = [];
  loading = false;
  error = '';

  constructor(private authService: AuthService, private rhumService: RhumService) {
    this.authService.currentUser.subscribe(user => {
      this.isLoggedIn = !!user;
    });
  }

  ngOnInit(): void {
    this.loadRandomRhums();
  }

  loadRandomRhums(): void {
    this.loading = true;
    this.error = '';
    
    this.rhumService.getRandomRhums(3).subscribe({
      next: (response) => {
        this.randomRhums = response.data;
        this.loading = false;
      },
      error: (err) => {
        this.error = err.message || 'Failed to load random rhums';
        this.loading = false;
      }
    });
  }
}