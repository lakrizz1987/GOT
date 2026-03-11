import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { Paths } from '../enums/paths.enum';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const targetUrl = state.url;
  const hasToken = authService.hasToken();

  if (hasToken && (targetUrl.includes(Paths.LOGIN) || targetUrl.includes(Paths.REGISTER))) {
    router.navigate([Paths.CHARACTERS]);
    return false;
  }

  if (!hasToken && targetUrl.includes(Paths.FAVORITES)) {
    router.navigate([Paths.LOGIN]);
    return false;
  }


  return true;
};
