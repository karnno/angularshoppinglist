import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from './recipe.model';
import { RecipeService } from './recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  providers: [RecipeService]
})
export class RecipesComponent implements OnInit {

  selectedRecipe : Recipe; 

  constructor(private recipeService : RecipeService) { }

  ngOnInit(): void {

    this.recipeService.recipeSelected.subscribe(
      (recipeSel : Recipe)=>{
        this.selectedRecipe = recipeSel;
      }

    )
    ;
  }

  // onRecipeSelectedEvent (selectedRecipe : Recipe){
  //   console.log("show details for recipe : " + selectedRecipe.name);
  //   this.selectedRecipe = selectedRecipe;
  // }

}
