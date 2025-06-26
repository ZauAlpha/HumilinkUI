import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('auth_token');
  const expirationDate = localStorage.getItem('expiration_date');
  
  if (token && expirationDate) {
    const currentTime = new Date().getTime();
    const expirationTime = parseInt(expirationDate, 10); 
    if (currentTime < expirationTime) {
      return true;
    } else {
      const router = inject(Router);
      router.navigate(['/login']);
      return false;
    }
  } else {
    console.log('AuthGuard - Missing token or expiration, access DENIED');
    const router = inject(Router);
    router.navigate(['/login']);
    return false;
  }
};