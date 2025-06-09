import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot } from "@angular/router";
import { Observable, of } from "rxjs";
import { Recipe } from "../../models/recipe.model";
import { RecipeService } from "../../services/recipe.service";

@Injectable({
  providedIn: "root",
})
export class RecipeDetailResolver implements Resolve<Recipe | null> {
  constructor(private recipeService: RecipeService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Recipe | null> {
    const id = route.paramMap.get("id");
    if (id) {
      return this.recipeService.getRecipeDetails(id);
    }
    return of(null);
  }
}
