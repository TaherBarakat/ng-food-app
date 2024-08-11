import {
  Component,
  ComponentFactoryResolver,
  ViewChild,
  viewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthResponseData, AuthService } from './auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertComponent } from '../alert/alert.component';
import { PlaceholderDirective } from '../placeholder/placeholder.directive';
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
})
export class AuthComponent {
  @ViewChild(PlaceholderDirective) alertHost: PlaceholderDirective;
  isLogin = true;
  isLoading = false;
  error = null;
  private closeSub: Subscription;
  constructor(
    private authSrv: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private componentFactoryResolver: ComponentFactoryResolver
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
      error: (errorMessage) => {
        this.isLoading = !this.isLoading;
        this.error = errorMessage;
        this.showErrorAlert(errorMessage);
        console.log(errorMessage);
      },
    });
    form.reset();
  }
  showErrorAlert(message: string) {
    const alertErrorFactory =
      this.componentFactoryResolver.resolveComponentFactory(AlertComponent);

    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();
    const componentRef =
      hostViewContainerRef.createComponent(alertErrorFactory);
    componentRef.instance.message = message;
    this.closeSub = componentRef.instance.close.subscribe(() => {
      this.closeSub.unsubscribe();
      hostViewContainerRef.clear();
    });
  }
  ngOnDestroy() {
    if (this.closeSub) {
      this.closeSub.unsubscribe();
    }
  }
}
