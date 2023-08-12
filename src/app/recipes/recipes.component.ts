import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from './recipe.model';
import { RecipeService } from './recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  // providers: [RecipeService] // added in course 118 // removed in course 238
})


/**
 * When the recipeService was added to providers, it was available in all the sub modules .
 * But when we open the application, and we navigate to the  shopping list and then back to  recipes list, 
 * the recipesComponent has been destroyed, and so was the instance of the recipeService.
 * 
 * To make sure the recipeService survices, we add it to the AppModule's providers.
 * 
 */
export class RecipesComponent implements OnInit {

  //selectedRecipe : Recipe; 

  constructor() { }

  ngOnInit(): void {

    // this.recipeService.recipeSelected.subscribe(
    //   (recipeSel : Recipe)=>{
    //     this.selectedRecipe = recipeSel;
    //   }

    // );
  }

  // onRecipeSelectedEvent (selectedRecipe : Recipe){
  //   console.log("show details for recipe : " + selectedRecipe.name);
  //   this.selectedRecipe = selectedRecipe;
  // }

}
