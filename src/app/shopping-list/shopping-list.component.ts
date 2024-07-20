import { Component, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.css',
})
export class ShoppingListComponent implements OnDestroy {
  ingredients: Ingredient[];
  private isChangedSub: Subscription;
  constructor(private slService: ShoppingListService) {
    console.log('constructor');
  }
  ngOnInit() {
    this.ingredients = this.slService.getIngredients();
    console.log('ngOnInit');
    this.isChangedSub = this.slService.IngredientsChanged.subscribe(
      (ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
      }
    );
  }

  ngOnDestroy() {
    this.isChangedSub.unsubscribe();
  }
  onEditItem(index: number) {
    console.log(index);
    this.slService.startedEditing.next(index);
  }
}
