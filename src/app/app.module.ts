import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ShoppingListEditComponent } from './shopping-list/shopping-list-edit/shopping-list-edit.component';
import { DropdownDirective } from './shared/dropdown.directive';
import { ShoppingListService } from './shopping-list/shopping-list.service';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  HTTP_INTERCEPTORS,
  HttpClientModule,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import { AuthComponent } from './auth/auth.component';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { authInterceptor } from './auth/auth-interceptor.interceptor';
import { AlertComponent } from './alert/alert.component';
import { PlaceholderDirective } from './placeholder/placeholder.directive';
import { RecipesModule } from './recipes/recipes.module';
import { ShoppingListModule } from './shopping-list/shopping-list.module';
// import { PlaceholderDirective } from './placeholder.directive';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,

    DropdownDirective,

    AuthComponent,
    SpinnerComponent,
    AlertComponent,
    PlaceholderDirective,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    RecipesModule,
    ShoppingListModule,
  ],
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
  bootstrap: [AppComponent],
})
export class AppModule {}
