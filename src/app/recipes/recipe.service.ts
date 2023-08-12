import { Injectable } from '@angular/core';
 

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable()
export class RecipeService{

    recipesChanged = new Subject <Recipe[]>();

    /*
    private recipes: Recipe[] = [
        new Recipe(
        'Salad1', 
        'Salad1 description', 
        'https://i0.wp.com/picjumbo.com/wp-content/uploads/traditional-korean-dish-bibimbap-with-chopsticks-free-photo.jpg?w=2210&quality=70',
        [
            new Ingredient('Egg',1),
            new Ingredient('Carrots',2)
        ]),
        new Recipe(
        'Chicken', 
        'Chicken recipe description', 
        'https://media.istockphoto.com/id/1320857678/photo/brazilian-fish-stew-moqueca.jpg?b=1&s=170667a&w=0&k=20&c=bcE72Zq71JEVt_lfL0fYWMCMjYV4AtxHxxB4EMIZamw=',
        [
            new Ingredient('Chicken',1),
            new Ingredient('Rice 100gr',3)
        ]
        )

    ];
    */
    private recipes: Recipe[] = [];

    constructor(private shoppingListService : ShoppingListService){

    }

   
    setRecipes(newRecipes: Recipe[]){
        console.log('current :'+ this.recipes.length + ' recipes '); 
        console.log('set     :'+ newRecipes.length + ' recipes ');
        this.recipes = newRecipes;
        console.log(this.recipes);
        this.recipesChanged.next(this.recipes.slice());
    }


    getRecipes(){
        // to prevent returning the reference to the array, 
        // we choose to return an exact copy of the array
        return this.recipes.slice();
    }

    getRecipe(index: number) {
        return this.recipes[index];
    }
    


    addToShoppingList(ingredients : Ingredient[]){        
        this.shoppingListService.addIngredients(ingredients);
    }


    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
        }

    updateRecipe(index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice());
    }
        
}