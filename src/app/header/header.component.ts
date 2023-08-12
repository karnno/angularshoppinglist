import { Component, ComponentFactoryResolver, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {

  isAuthenticated = false;
  private userSub : Subscription;

  @Output('menuClicked') menuClickedEvent = new EventEmitter<string>();
  constructor(private dataStorageService : DataStorageService, private authService : AuthService) { }

  ngOnInit(): void {

    this.userSub = this.authService.user.subscribe( user => {
      // user is not null => we are logged in !

      this.isAuthenticated = !user ? false : true; //  = !!user;
      console.log(!user);
      console.log(!!user);

    });
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }


  menuClicked(feature:string){
    this.menuClickedEvent.emit(feature);
  }


  onSaveData (){
    this.dataStorageService.storesRecipes();
  }

  onFetchData (){
    this.dataStorageService.fetchRecipes().subscribe();
  }

  onLogout(){
    this.authService.logout();
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
