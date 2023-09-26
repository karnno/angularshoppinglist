import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { AuthComponent } from './auth/auth.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' } ,

  { path: 'recipes', 
    loadChildren: () =>
    import("./recipes/recipes.module").then(m => m.RecipesModule) 
  }

  ,
  { path: 'shopping-list', 
    loadChildren: () =>
    import("./shopping-list/shopping-list.module").then(m => m.ShoppingListModule) 
  } 
  
  ,
  { path: 'auth', 
    loadChildren: () =>
    import("./auth/auth.module").then(m => m.AuthModule) 
  } 

  

];

@NgModule({
  // enable the preloading of lazy loaded modules, gain a small amount of time. 
  // we obtain fast initial load with lazy loading, and fast subsequent loads with other modules being pre-loaded
  imports: [RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule] 
  // as every module works ON ITS OWN and the modules do not communication with each other, whatever we declare in this module is only usable here
  // , so we add the "exports" property so the exported modules are usable elsewhere, in our case, in the the AppModule.
})
export class AppRoutingModule {

}
