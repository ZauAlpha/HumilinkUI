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
  copiedId: number | null = null;
  loading$ = new BehaviorSubject(true);
  copyToClipboard(index: number) {
    this.urls$.subscribe((urls) => {
      if (!urls || index < 0 || index >= urls.length) {
        console.warn(
          'No se puede copiar: urls es null o el índice es inválido'
        );
        return;
      }
      const url = urls[index];
      navigator.clipboard.writeText(url.humiLink).then(() => {
        this.copiedId = index;
        setTimeout(() => {
          this.copiedId = null;
        }, 2000); // mensaje visible por 2 segundos
      });
    });
  }

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
