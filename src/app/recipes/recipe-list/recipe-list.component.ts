import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';


/**
 * The recipe list component will only be fed with the list of recipe 
 * to display.
 * But the subcomponent recipe-item will handle the selection event.
 */
@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  recipes: Recipe[];

  //@Output('recipeSelected') recipeClickedEvent = new EventEmitter<Recipe>();

  constructor(private recipeService : RecipeService) { }

  ngOnInit(): void {
    this.recipes = this.recipeService.getRecipes();
  }

  // clickOnRecipeName(oneRecipe : Recipe){
  //   console.log("I clicked on : " + oneRecipe.name + " : " + oneRecipe.description);
  //   this.recipeClickedEvent.emit(oneRecipe);
  // }
}
