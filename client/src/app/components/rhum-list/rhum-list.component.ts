import { Component, OnInit } from '@angular/core';
import { RhumService } from '../../services/rhum.service';
import { Rhum } from '../../models/rhum.model';

@Component({
  selector: 'app-rhum-list',
  templateUrl: './rhum-list.component.html',
  styleUrls: ['./rhum-list.component.scss']
})
export class RhumListComponent implements OnInit {
  rhums: Rhum[] = [];
  loading = false;
  error = '';

  constructor(private rhumService: RhumService) { }

  ngOnInit(): void {
    this.loadRhums();
  }

  loadRhums(): void {
    this.loading = true;
    this.rhumService.getAllRhums()
      .subscribe({
        next: (data) => {
          this.rhums = data.data;
          this.loading = false;
        },
        error: (error) => {
          this.error = 'Failed to load rhums. Please try again later.';
          console.error('Error loading rhums:', error);
          this.loading = false;
        }
      });
  }
}