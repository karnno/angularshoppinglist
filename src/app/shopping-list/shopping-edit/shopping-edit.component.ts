import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  // Usage of ViewChild + Element Ref , to get a reference to the HTML element in the Template
  @ViewChild('inputName')  name  : ElementRef;
  @ViewChild('inputAmount')  amount  : ElementRef;

  // @Output('onAddIngredients') ingredientToAdd = new EventEmitter<{name:string , number : number}>();
  // @Output('onAddIngredients') ingredientToAdd = new EventEmitter<Ingredient>();
  constructor(private shoppingListService:ShoppingListService) { }

  ngOnInit(): void {
  }


  onAdd(event : any){
     
    // this.ingredientToAdd.emit( 
    //   new Ingredient( this.name.nativeElement.value, this.amount.nativeElement.value )
    //   );

    this.shoppingListService.addIngredient(new Ingredient( this.name.nativeElement.value, this.amount.nativeElement.value ));
  }

  onDelete(event : any){
    
  }

  onClear(event : any){
    
  }
}
