import { inject } from "@angular/core";
import { ResolveFn } from "@angular/router";
import { Observable, of } from "rxjs";
import { Recipe } from "../../models/recipe.model";
import { RecipeService } from "../../services/recipe.service";

export const recipeDetailResolver: ResolveFn<Recipe | null> = (route) => {
  const recipeService = inject(RecipeService);
  const id = route.paramMap.get("id");
  if (id) {
    return recipeService.getRecipeDetails(id);
  }
  return of(null);
};
