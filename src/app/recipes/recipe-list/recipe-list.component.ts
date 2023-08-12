import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

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
export class RecipeListComponent implements OnInit ,OnDestroy {
  recipes: Recipe[];
  subscription: Subscription;

  //@Output('recipeSelected') recipeClickedEvent = new EventEmitter<Recipe>();

  constructor(private recipeService: RecipeService,
    private router: Router,
    private route: ActivatedRoute) {
}

  ngOnInit(): void {
    this.subscription = this.recipeService.recipesChanged
      .subscribe(
        
        (recipes: Recipe[]) => {

          console.log('subject next !');
          
          this.recipes = recipes;
        }
      );
    this.recipes = this.recipeService.getRecipes();
  }

  // clickOnRecipeName(oneRecipe : Recipe){
  //   console.log("I clicked on : " + oneRecipe.name + " : " + oneRecipe.description);
  //   this.recipeClickedEvent.emit(oneRecipe);
  // }

  onNewRecipe() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
