import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthResponseData, AuthService } from './auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
})
export class AuthComponent {
  isLogin = true;
  isLoading = false;
  error = null;

  constructor(
    private authSrv: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  onSwitchMode() {
    this.isLogin = !this.isLogin;
  }

  onSubmit(form: NgForm) {
    this.isLoading = !this.isLoading;

    if (form.invalid) {
      return;
    }

    const { email, password } = form.value;
    let authObs: Observable<AuthResponseData>;
    console.log(email, password);

    if (this.isLogin) {
      authObs = this.authSrv.signin(email, password);
    } else {
      authObs = this.authSrv.signup(email, password);
    }

    authObs.subscribe({
      next: (resData) => {
        this.isLoading = !this.isLoading;
        console.log(resData);
        this.router.navigate(['/recipes'], { relativeTo: this.route });
      },
      error: (errorMessage: HttpErrorResponse) => {
        this.isLoading = !this.isLoading;
        this.error = errorMessage;
        console.log(errorMessage);
      },
    });
    form.reset();
  }
}
