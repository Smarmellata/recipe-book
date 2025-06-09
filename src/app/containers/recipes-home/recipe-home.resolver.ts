import { Injectable } from "@angular/core";
import { Resolve } from "@angular/router";
import { Observable } from "rxjs";
import { Recipe } from "../../models/recipe.model";
import { RecipeService } from "../../services/recipe.service";
@Injectable({
  providedIn: "root",
})
export class RecipesHomeResolver implements Resolve<Recipe[]> {
  constructor(private recipeService: RecipeService) {}

  resolve(): Observable<Recipe[]> {
    return this.recipeService.getRandomRecipes(10);
  }
}
