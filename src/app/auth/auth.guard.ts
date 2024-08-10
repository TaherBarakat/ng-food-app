import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { map, take } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const authSrv = inject(AuthService);
  const router = inject(Router);
  return authSrv.user.pipe(
    take(1),
    map((user) => {
      return !!user ? true : router.createUrlTree(['/auth']);
    })
  );
};
