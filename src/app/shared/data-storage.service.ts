import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { exhaustMap, map, take, tap } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user.moder';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private recipeServices: RecipeService,
    private authSrv: AuthService
  ) {}

  storeRecipes() {
    const recipes = this.recipeServices.getRecipes();
    this.http
      .put(
        'https://ng-recipe-book-e52cf-default-rtdb.firebaseio.com/recipes.json ',
        recipes
      )
      .subscribe((response) => {
        console.log(response);
      });
  }
  fetchRecipes() {
    // let tok = 111;
    return this.authSrv.user.pipe(
      take(1),
      exhaustMap((user) => {
        console.log(user, 'exhaustMap');

        return this.http.get<Recipe[]>(
          'https://ng-recipe-book-e52cf-default-rtdb.firebaseio.com/recipes.json ',
          { params: new HttpParams().set('auth', user.token) }
        );
      }),

      map((recipes) => {
        console.log(recipes, 'D');

        return recipes.map((recipe) => {
          return {
            ...recipe,
            ingredients: recipe.ingredients ? recipe.ingredients : [],
          };
        });
      }),
      tap((recipes) => {
        this.recipeServices.setRecipes(recipes);
      })
    );
  }
}
