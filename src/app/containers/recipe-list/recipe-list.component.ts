import { Component, Input } from "@angular/core";
import { Recipe } from "../../models/recipe.model";
import { RecipeService } from "../../services/recipe.service";
import { forkJoin } from "rxjs";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";

@Component({
  selector: "app-recipe-list",
  templateUrl: "./recipe-list.component.html",
  styleUrls: ["./recipe-list.component.css"],
})
export class RecipeListComponent {
  recipes: Recipe[] = [];

  constructor(private recipesService: RecipeService, private router: Router) {
    this.recipesService.getRandomRecipes(9).subscribe((recipes: Recipe[]) => {
      this.recipes = recipes;
    });
  }

  onSearch(keyword: string) {
    if (!keyword || keyword.trim() === "") {
      this.recipesService.getRandomRecipes(9).subscribe((recipes: Recipe[]) => {
        this.recipes = recipes;
      });
      return;
    }

    forkJoin([
      this.recipesService.filterRecipesByIngredient(keyword),
      this.recipesService.filterRecipesByCategory(keyword),
      this.recipesService.filterRecipesByArea(keyword),
      this.recipesService.searchRecipesByName(keyword),
    ])
      .pipe(
        map((results) => {
          // Flatten all arrays and deduplicate by idMeal
          const allRecipes = ([] as Recipe[]).concat(...results);
          const unique = new Map();
          allRecipes.forEach((r) => {
            if (r && r.idMeal) unique.set(r.idMeal, r);
          });
          return Array.from(unique.values());
        })
      )
      .subscribe(
        (recipes: Recipe[]) =>
          (this.recipes = recipes.map((recipe) => ({
            ...recipe,
            isFavorite: !!this.recipesService.getSingleFavorite(recipe.idMeal),
          })))
      );
  }

  goToRecipe(recipe: Recipe) {
    this.router.navigate(["/recipe", recipe.idMeal]);
  }
}
