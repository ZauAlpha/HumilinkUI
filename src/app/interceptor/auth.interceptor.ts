import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('auth_token');
  const expirationDate = localStorage.getItem('expiration_date');
  const router = inject(Router);

  console.log('🌐 URL:', req.url);
  console.log('🔑 Token existe:', token ? 'SÍ' : 'NO');
  console.log('⏰ Expiration:', expirationDate);

  const publicUrls = ['/auth/login', '/auth/register'];
  const isPublicUrl = publicUrls.some((url) => req.url.includes(url));

  console.log('🔓 Es URL pública:', isPublicUrl);
  console.log('✅ Está autenticado:', isAuthenticated(token, expirationDate));

  // Solo agregar token si NO es URL pública Y está autenticado
  if (!isPublicUrl && isAuthenticated(token, expirationDate)) {
    console.log('🚀 Agregando token a la request');

    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(authReq.headers);

    return next(authReq);
  }

  // Si no está autenticado y no es URL pública, redirigir al login
  if (!isPublicUrl && !isAuthenticated(token, expirationDate)) {
    console.log('❌ No autenticado, redirigiendo al login');
    localStorage.removeItem('auth_token');
    localStorage.removeItem('expiration_date');
    router.navigate(['/login']);
  }

  console.log('📤 Enviando request sin token');
  return next(req);
};

function isAuthenticated(
  token: string | null,
  expirationDate: string | null
): boolean {
  if (!token || !expirationDate) {
    return false;
  }

  const currentTime = new Date().getTime();
  const expirationTime = parseInt(expirationDate, 10);
  const isValid = currentTime < expirationTime;

  console.log('🕐 Tiempo actual:', new Date(currentTime).toLocaleString());
  console.log(
    '🕐 Tiempo expiración:',
    new Date(expirationTime).toLocaleString()
  );
  console.log('✅ Token válido:', isValid);

  return isValid;
}
