import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoppingListEditComponent } from './shopping-list-edit/shopping-list-edit.component';
import { ShoppingListComponent } from './shopping-list.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: 'shopping-list',
    component: ShoppingListComponent,
  },
];

@NgModule({
  declarations: [ShoppingListComponent, ShoppingListEditComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [RouterModule],
})
export class ShoppingListModule {}
