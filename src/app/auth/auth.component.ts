import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
})
export class AuthComponent {
  isLogin = true;
  constructor(private authSrv: AuthService) {}
  onSwitchMode() {
    this.isLogin = !this.isLogin;
  }
  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }

    const { email, password } = form.value;
    console.log(email, password);

    if (this.isLogin) {
      // dddddddddddd
    } else {
      this.authSrv.signup(email, password).subscribe(
        (resData) => console.log(resData),
        (error) => console.log(error)
      );
    }
    // form.reset()
  }
}
