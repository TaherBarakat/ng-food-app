// import { HttpInterceptorFn, HttpParams } from '@angular/common/http';
// import { inject } from '@angular/core';
// import { AuthService } from './auth.service';
// import { exhaustMap, take } from 'rxjs/operators';

// export const authInterceptor: HttpInterceptorFn = (req, next) => {
//   const authService = inject(AuthService);

//   console.log('intercept');
//   return authService.user.pipe(
//     take(1),
//     exhaustMap((user) => {
//       if (user) {
//         return next(req);
//       }
//       const modifiedReq = req.clone({
//         params: new HttpParams().set('auth', user.token),
//       });
//       return next(modifiedReq);
//     })
//   );
// };

import {
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpParams,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';
import { exhaustMap, take } from 'rxjs/operators';

export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) => {
  const authService = inject(AuthService);

  // console.log('intercept');
  // return next(req);

  return authService.user.pipe(
    take(1),
    exhaustMap((user) => {
      if (!user) {
        // Correct logic for checking user presence
        return next(req);
      }
      const modifiedReq = req.clone({
        params: new HttpParams().set('auth', user.token),
      });
      return next(modifiedReq);
    })
  );
};
