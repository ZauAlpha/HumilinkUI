import { Component, OnInit } from '@angular/core';
import { NewHumiComponent } from '../new-humi/new-humi.component';
import { DashboardComponent } from '../dashboards/dashboard/dashboard.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [NewHumiComponent, DashboardComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
})
export class MainComponent {}
