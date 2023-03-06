import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RecipeDetailComponent } from "./recipes/recipe-detail/recipe-detail.component";
import { RecipeListComponent } from "./recipes/recipe-list/recipe-list.component";
import { RecipesComponent } from "./recipes/recipes.component";
import { ShoppingEditComponent } from "./shopping-list/shopping-edit/shopping-edit.component";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component"

const appRoutes:Routes =[
    { path:'' , redirectTo : 'recipes', pathMatch:'full'},
    
    { path:'recipes',   component : RecipesComponent, children:[
        { path:'list' , component : RecipeListComponent} ,
        { path:':name', component : RecipeDetailComponent} 
      ]
    },



    { path:'shopping-list',     component: ShoppingListComponent, children:[
        { path:':id/edit', component : ShoppingEditComponent}   
      ]
    },

    { path:'**' , redirectTo: '/' }
];
@NgModule({

    imports:[
        //RouterModule.forRoot(appRoutes, {useHash:true})
        RouterModule.forRoot(appRoutes)
    ],

    exports: [
        RouterModule
    ]


})
export class AppRoutingModule{

}