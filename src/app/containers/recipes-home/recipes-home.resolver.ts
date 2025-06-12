import { inject } from "@angular/core";
import { ResolveFn } from "@angular/router";
import { Recipe } from "../../models/recipe.model";
import { RecipeService } from "../../services/recipe.service";

export const recipesHomeResolver: ResolveFn<Recipe[]> = ()  => {
  const recipeService = inject(RecipeService);
  return recipeService.getRandomRecipes(10);
};