import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'new-humi',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './new-humi.component.html',
  styleUrl: './new-humi.component.css',
})
export class NewHumiComponent {
  private apiService: ApiService = inject(ApiService);
  newHumiURL: string = '';
  newHumiTitle: string = '';
  isValid: boolean = false;

  addHumi() {
    this.apiService.addHumi(this.newHumiURL, this.newHumiTitle);
    this.newHumiURL = '';
  }

  onUrlChange(value: string): void {
    this.newHumiURL = value;
    try {
      const url = new URL(value);
      this.isValid = url.protocol === 'http:' || url.protocol === 'https:';
    } catch (_) {
      this.isValid = false;
    }
  }
}
