import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';
@Injectable()
export class RecipeService {
  recipeChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
    new Recipe(
      'mack and cheese',
      'this is a test',
      'https://t3.ftcdn.net/jpg/01/79/59/92/360_F_179599293_7mePKnajSM4bggDa8NkKpcAHKl3pow2l.webp',
      [new Ingredient('meat', 1), new Ingredient('french fries', 10)]
    ),
    new Recipe(
      'double cheese burger',
      'this is a test22222',
      'https://t3.ftcdn.net/jpg/01/79/59/92/360_F_179599293_7mePKnajSM4bggDa8NkKpcAHKl3pow2l.webp',
      [
        new Ingredient('chicken', 1),
        new Ingredient('salt', 7),
        new Ingredient('paper', 88),
      ]
    ),
  ];
  constructor(private slService: ShoppingListService) {}

  getRecipes() {
    return this.recipes.slice();
  }
  getRecipe(id: number) {
    console.log(this.recipes[id]);
    return this.recipes[id];
  }
  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }
  addRecipe(recipe: Recipe) {
    // console.log(this.recipes);
    this.recipes.push(recipe);
    this.recipeChanged.next(this.recipes.slice());
  }
  updateRecipe(index: number, newRecipe: Recipe) {
    // console.log(this.recipes);
    this.recipes[index] = newRecipe;
    this.recipeChanged.next(this.recipes.slice());
  }
}
