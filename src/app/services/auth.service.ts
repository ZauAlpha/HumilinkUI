import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { AuthResponse } from '../model/AuthResponse';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8080';
  constructor(private http: HttpClient) {}
  login(username: string, password: string): Observable<any> {
    const url = `${this.apiUrl}/auth/login`;
    const body = { username, password };
    return this.http.post<AuthResponse>(url, body).pipe(
      tap((response) => {
        this.saveToken(response.token);
        this.saveExpirationDate(response.expiration_time);
      })
    );
  }
  register(username: string, email: string, password: string): Observable<any> {
    const url = `${this.apiUrl}/auth/register`;
    const body = { username, email, password };
    return this.http.post<AuthResponse>(url, body).pipe(
      tap((response) => {
        this.saveToken(response.token);
        this.saveExpirationDate(response.expiration_time);
      })
    );
  }
  isAuthenticated(): boolean {
    const expiration_date = this.getExpirationDate();
    if (this.getToken() && expiration_date) {
      const currentTime = new Date().getTime();
      const expirationTime = parseInt(expiration_date, 10);
      return currentTime < expirationTime;
    }
    return false;
  }
  saveExpirationDate(expirationDate: string): void {
    localStorage.setItem('expiration_date', expirationDate);
  }
  // Método para obtener la fecha de expiración
  getExpirationDate(): string | null {
    return localStorage.getItem('expiration_date');
  }
  // Método para guardar el token
  saveToken(token: string): void {
    localStorage.setItem('auth_token', token);
  }

  // Método para obtener el token
  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  // Método para cerrar sesión
  logout(): void {
    localStorage.removeItem('auth_token');
  }
}
