import { Component, inject } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  username = '';
  password = '';
  email = '';
  confirmPW = '';
  private authService: AuthService = inject(AuthService);
  private router: Router = inject(Router);
  passwordVisibility = false;
  confirmPwVisibility = false;
  validEmailV = true;
  validPasswordV = true;
  validUsername = true;
  invalidUsername = '';
  invalidEmail = '';
  invalidPassword = '';

  validEmail() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    if (!emailRegex.test(this.email)) {
      this.invalidEmail = 'Formato de email inválido';
      this.validEmailV = false;
    }

    this.validEmailV = false;
  }
  validPassword() {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#+\-])[A-Za-z\d@$!%*?&#+\-]{8,}$/;

    if (!this.password) {
      this.invalidPassword = 'La contraseña es requerida';
      this.validPasswordV = false;
    }

    if (!passwordRegex.test(this.password)) {
      this.invalidPassword =
        'Debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un símbolo';
      this.validPasswordV = false;
    }

    if (this.password !== this.confirmPW) {
      this.invalidPassword = 'Las contraseñas no coinciden';
      this.validPasswordV = false;
    }

    this.invalidPassword = '';
    return true;
  }

  login() {
    this.router.navigate(['/login']);
  }
  register() {
    if (!this.username) {
      this.invalidUsername = 'El usuairo es requerido';
      this.validUsername = false;
    }
    if (!this.email) {
      this.invalidEmail = 'El email es requerido';
      this.validEmailV = false;
    }
    this.authService
      .register(this.username, this.email, this.password)
      .subscribe({
        next: (response) => {
          this.router.navigate(['/main']);
        },
        error: (error) => {
          console.error('Login failed', error);
        },
      });
  }
  togglePasswordVisibility() {
    this.passwordVisibility = !this.passwordVisibility;
  }
  toggleConfirmVisibilty() {
    this.confirmPwVisibility = !this.confirmPwVisibility;
  }
}
