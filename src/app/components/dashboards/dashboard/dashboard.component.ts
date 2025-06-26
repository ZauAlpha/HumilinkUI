import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, startWith } from 'rxjs';

@Component({
  selector: 'dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  private apiService: ApiService = inject(ApiService);
  urls$ = this.apiService.humis$.pipe(startWith(null));
  loading$ = new BehaviorSubject(true);

  ngOnInit(): void {
    this.apiService.getHumis().subscribe({
      next: () => this.loading$.next(false),
      error: () => this.loading$.next(true),
    });
  }
  toJson(value: any): string {
    return JSON.stringify(value);
  }
}
