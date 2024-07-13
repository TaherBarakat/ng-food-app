import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Recipe } from '../../recipe.model';
import { RecipeService } from '../../recipe.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrl: './recipe-item.component.css',
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe: Recipe;
  @Input() id: number;

  constructor(private recipeService: RecipeService) {}
  ngOnInit() {
    console.log(this.id);
    console.log(this.recipe);
  }

  // onSelected() {
  //   this.recipeService.recipeSelected.emit(this.recipe);
  // }
}
