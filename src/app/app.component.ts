import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  showRecipesList : boolean = true;
  showRecipeIngredients:boolean = false;

  loadedFeature : string = 'menuRecipeListClicked' ;

  // receivedMenuClickedEvent(menuClickedEvent: {menuClickedName:string}){
  //   console.log(menuClickedEvent.menuClickedName);
  //   this.showRecipesList = menuClickedEvent.menuClickedName === 'menuRecipeListClicked';
  //   this.showRecipeIngredients = menuClickedEvent.menuClickedName === 'menuShoppingListClicked';
    
  // }


  receivedMenuClickedEvent(menuClickedEvent: string){
    console.log(menuClickedEvent);
    this.loadedFeature = menuClickedEvent;
    
  }

}
