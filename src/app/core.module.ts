import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './auth/auth-interceptor.interceptor';
import { ShoppingListService } from './shopping-list/shopping-list.service';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [
    provideHttpClient(withInterceptors([authInterceptor])),
    // {
    //   useFactory: authInterceptor,
    //   useValue: ,
    //   provide: HTTP_INTERCEPTORS,
    //   multi: false,
    // },
    ShoppingListService,
  ],
})
export class CoreModule {}
