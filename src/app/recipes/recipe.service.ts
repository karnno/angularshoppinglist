import { EventEmitter, Injectable } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";

@Injectable()
export class RecipeService{

    recipeSelected = new EventEmitter<Recipe>();

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

    constructor(private shoppingListService : ShoppingListService){

    }


    getRecipes(){
        // to prevent returning the reference to the array, 
        // we choose to return an exact copy of the array
        return this.recipes.slice();
    }


    addToShoppingList(ingredients : Ingredient[]){        
        this.shoppingListService.addIngredients(ingredients);
    }
}