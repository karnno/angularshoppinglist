import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipe.service";
import { exhaustMap, map, take, tap } from "rxjs";
import { AuthService } from "../auth/auth.service";

@Injectable({providedIn : 'root'})
export class DataStorageService {


    constructor(private httpClient : HttpClient,
        private recipeService : RecipeService,
        private authService : AuthService){
        
    }


    storesRecipes( ){

        const recipes = this.recipeService.getRecipes();
 
        console.log('We store ' + recipes.length + ' recipes');
        this.httpClient.put('https://angular-firebase-01-5aaf3-default-rtdb.europe-west1.firebasedatabase.app/recipes.json',
            recipes
        ).subscribe(
            response => {
                console.log(response);
            }
        )
        ;


    }

    fetchRecipes(){


        // we comment the following code, indeed, we used to add the token in the query.
        // but after the use of the AuthInterceptor that automaticall adds the token to all OUTGOING request, we will simplify the code here
         /*

        // take(1) means we only interrogate once and we unsubscribe immediately
        // more info on exhaustmap here : https://runebook.dev/fr/docs/rxjs/api/operators/exhaustmap
        return this.authService.user.pipe(
            take(1), 
            exhaustMap(user => {
                return this.httpClient.get<Recipe[]>('https://angular-firebase-01-5aaf3-default-rtdb.europe-west1.firebasedatabase.app/recipes.json'
                ,
                {
                    params: new HttpParams().set('auth', user.token)
                }
                )
            })
            , map(
                recipes => {
                    return recipes.map( recipe => {
                        return {
                            ...recipe,
                            ingredients: recipe.ingredients? recipe.ingredients:[]
                        };

                    });


                }

            ) ,

                tap( recipes => {
                    this.recipeService.setRecipes(recipes);
                }
                )
        );
        */
        
        return this.httpClient.get<Recipe[]>(
            'https://angular-firebase-01-5aaf3-default-rtdb.europe-west1.firebasedatabase.app/recipes.json'
        )
         
        .pipe( 
            map(
                recipes => {
                    return recipes.map( recipe => {
                        return {
                            ...recipe,
                            ingredients: recipe.ingredients? recipe.ingredients:[]
                        };

                    });


                }

            ),

            tap( recipes => {
                this.recipeService.setRecipes(recipes);
            }
            )
        )
        
        ;
         
    }
}

