import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
} from '@angular/router';

import { AuthLayoutService } from '../layout/auth-layout/auth-layout.service';

export const roleGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot
) => {
  const authService = inject(AuthLayoutService);
  const router = inject(Router);

  const roles = route.data['roles'] as (
    | 'admin'
    | 'doctor'
    | 'nurse'
  )[];

  if (authService.hasRole(...roles)) {
    return true;
  }

  router.navigate(['/dashboard']);
  return false;
};