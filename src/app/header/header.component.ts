import { Component, ComponentFactoryResolver, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

  @Output('menuClicked') menuClickedEvent = new EventEmitter<string>();
  constructor() { }

  ngOnInit(): void {
  }


  menuClicked(feature:string){
    this.menuClickedEvent.emit(feature);
  }



  // showRecipesList(){

  //   console.log('menuRecipeListClicked');
  //   this.menuClickedEvent.emit({
  //     menuClickedName: 'menuRecipeListClicked'
  //   });
  // }


  // showRecipeIngredients(){
  //   console.log('menuShoppingListClicked');
  //   this.menuClickedEvent.emit({
  //     menuClickedName: 'menuShoppingListClicked'
  //   });
  // }  

}
