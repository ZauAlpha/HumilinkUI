import { Component, inject, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Route, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  username: string = ''; // Propiedad para el username
  password: string = ''; // Propiedad para el password
  showPassword: boolean = false;
  private authService: AuthService = inject(AuthService);
  private router: Router = inject(Router);

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/main']);
    }
  }

  login() {
    console.log('Iniciando login...');
    this.authService.login(this.username, this.password).subscribe({
      next: (response) => {
        this.router.navigate(['/main']);
      },
      error: (error) => {
        console.error('Login failed', error);
      },
    });
  }

  register() {
    this.router.navigate(['/register']);
  }
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
