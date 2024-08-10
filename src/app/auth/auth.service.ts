import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { BehaviorSubject, catchError, Subject, tap, throwError } from 'rxjs';
import { User } from './user.moder';
import { Route, Router } from '@angular/router';

export interface AuthResponseData {
  kind: string;
  localId: string;
  email: string;
  displayName?: string;
  idToken: string;
  registered?: boolean;
  refreshToken: string;
  expiresIn: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user = new BehaviorSubject<User | null>(null);
  tokenExpirationTime: any;
  constructor(private http: HttpClient, private router: Router) {}

  logout() {
    localStorage.removeItem('NG_FOOD_APP_USER');
    if (this.tokenExpirationTime) {
      clearTimeout(this.tokenExpirationTime);
    }
    this.tokenExpirationTime = null;
    this.user.next(null);
    this.router.navigate(['/auth']);
  }
  autoLogout(expirationDuration: number) {
    this.tokenExpirationTime = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }
  autoLogin() {
    const userStoredData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('NG_FOOD_APP_USER'));

    if (!userStoredData) return;

    let { email, id, _token, _tokenExpirationDate } = userStoredData;
    const loadedUser = new User(
      email,
      id,
      _token,
      new Date(_tokenExpirationDate)
    );

    // console.log(
    // );
    this.autoLogout(
      new Date(_tokenExpirationDate).getTime() - new Date().getTime()
    );
    if (loadedUser.token) {
      console.log(loadedUser, 'ddd', loadedUser.token);
      this.user.next(loadedUser);
    }
  }
  signup(email: string, password: string) {
    console.log(email, password);
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?',

        {
          email,
          password,
          returnSecureToken: true,
        },
        {
          params: {
            key: environment.firebase.apiKey,
          },
        }
      )
      .pipe(tap(this.handleAuthentication), catchError(this.handleError));
  }

  signin(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?',
        {
          email,
          password,
          returnSecureToken: true,
        },
        {
          params: {
            key: environment.firebase.apiKey,
          },
        }
      )
      .pipe(
        tap((resData) => {
          this.handleAuthentication(resData);
        }),
        catchError(this.handleError)
      );
  }

  private handleAuthentication(resData: AuthResponseData) {
    let { email, idToken, expiresIn, localId } = resData;

    const expirationDate = new Date(new Date().getTime() + +expiresIn * 1000);
    const user = new User(email, localId, idToken, expirationDate);
    // console.log(expirationDate);
    // console.log(expiresIn);
    // console.log(user);
    // console.log(new Date(), expirationDate, new Date() < expirationDate);
    this.user.next(user);
    this.autoLogout(+expiresIn * 1000);

    localStorage.setItem('NG_FOOD_APP_USER', JSON.stringify(user));
  }

  private handleError<Observable>(errorRes: HttpErrorResponse) {
    console.log(errorRes);

    let errorMessage = 'An error occurred!';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }

    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'this email exists already';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'this email does not exists';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'this password is not correct';
        break;
    }
    return throwError(errorMessage);
  }
}
