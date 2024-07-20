import {
  Component,
  ElementRef,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrl: './shopping-list-edit.component.css',
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {
  // @ViewChild('nameInput') nameInputRef: ElementRef;
  // @ViewChild('amountInput') amountInputRef: ElementRef;
  @ViewChild('f') editForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;
  constructor(private slService: ShoppingListService) {}
  ngOnInit(): void {
    this.subscription = this.slService.startedEditing.subscribe((index) => {
      this.editMode = true;
      this.editedItemIndex = index;
      this.editedItem = this.slService.getIngredient(index);
      // console.log(this.editedItem);
      this.editForm.setValue(this.editedItem);
    });
  }
  onSubmit(form: NgForm) {
    const newIngredient = new Ingredient(
      form.value.name,
      form.value.amount
      // this.nameInputRef.nativeElement.value,
      // this.amountInputRef.nativeElement.value
    );
    if (this.editMode)
      this.slService.updateIngredient(this.editedItemIndex, newIngredient);
    else this.slService.addIngredient(newIngredient);
    // console.log(this.slService.getIngredients());
    // console.log(form.value);
    this.editMode = false;
    form.reset();
  }
  onClear() {
    this.editMode = false;
    this.editForm.reset();
  }
  onDelete() {
    this.slService.deleteIngredient(this.editedItemIndex);
    this.onClear();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
