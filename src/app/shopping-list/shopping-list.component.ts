import { Component } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.css',
})
export class ShoppingListComponent {
  ingredients: Ingredient[];
  constructor(private slService: ShoppingListService) {
    console.log('constructor');
  }
  ngOnInit() {
    this.ingredients = this.slService.getIngredients();
    console.log('ngOnInit');
  }

  ngDoCheck() {
    this.ingredients = this.slService.getIngredients();
    console.log('ngDoCheck');
  }
}
