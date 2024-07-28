import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { catchError, tap, throwError } from 'rxjs';

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
  constructor(private http: HttpClient) {}

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
      .pipe(
        tap((res) => console.log(res)),
        catchError(this.handleError)
      );
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
        tap((res) => console.log(res)),
        catchError(this.handleError)
      );
  }

  private handleError<Observable>(errorRes: HttpErrorResponse) {
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
