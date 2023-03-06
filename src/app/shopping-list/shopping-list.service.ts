import { EventEmitter } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";

export class ShoppingListService{
  
    ingredientAdded = new EventEmitter<Ingredient[]>(); 
    
    private ingredients:Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Banana', 10)
    ];

    // returns a copy of the array via .slice() method
    getIngredients(): Ingredient[] {
        return this.ingredients.slice();
    }

    addIngredient(ingred : Ingredient){
        console.log("we want to add "+ingred.name + " , "+ingred.amount);
        this.ingredients.push(ingred);  

        this.ingredientAdded.emit(this.ingredients.slice());
    }

    addIngredients(ingredients : Ingredient[]){
        // for (var ing of ingredients){
        //     this.ingredients.push(ing);
        // }  

        this.ingredients.push(...ingredients);
        this.ingredientAdded.emit(this.ingredients.slice());
    }

    
}