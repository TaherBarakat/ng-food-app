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
    const { email, password } = form.value;
    console.log(email, password);
    this.authSrv.signup(email, password).subscribe((d) => console.log(d));
  }
}
