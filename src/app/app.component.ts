import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { LoggingService } from './logging.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{


  constructor(private authService: AuthService, private loggingService : LoggingService){

  }

  ngOnInit(): void {
    console.log('app component calls auto login');
    this.authService.autoLogin();  
    this.loggingService.printLog('Hello from the AppComponent ngOnInit');
  }
  //showRecipesList : boolean = true;
  //showRecipeIngredients:boolean = false;

  //loadedFeature : string = 'menuRecipeListClicked' ;

  // receivedMenuClickedEvent(menuClickedEvent: {menuClickedName:string}){
  //   console.log(menuClickedEvent.menuClickedName);
  //   this.showRecipesList = menuClickedEvent.menuClickedName === 'menuRecipeListClicked';
  //   this.showRecipeIngredients = menuClickedEvent.menuClickedName === 'menuShoppingListClicked';
    
  // }


  // receivedMenuClickedEvent(menuClickedEvent: string){
  //   console.log(menuClickedEvent);
  //   this.loadedFeature = menuClickedEvent;
    
  // }

  //onNavigate(feature: string) {
  //  this.loadedFeature = feature;
  //}

}
