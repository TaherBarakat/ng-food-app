import { Component } from '@angular/core';
import { ingredient } from '../shared/ingredient.model';
@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.css',
})
export class ShoppingListComponent {
  ingredients: ingredient[] = [new ingredient('tomato', 3)];
}
