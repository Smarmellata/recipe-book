import { Component, Input } from "@angular/core";
import { Recipe } from "../../models/recipe.model";
import { RecipeService } from "../../services/recipe.service";
import { forkJoin } from "rxjs";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";

@Component({
  selector: "app-recipe-list",
  templateUrl: "./favorites-recipes.component.html",
  styleUrls: ["./favorites-recipes.component.css"],
})
export class FavoritesRecipesComponent {
  favorites: Recipe[] = [];

  constructor(private router: Router, private favoriteService: RecipeService) {
    this.loadFavorites();
  }

  loadFavorites(): void {
    this.favorites = this.favoriteService.getFavorites();
  }

  removeFavorite(recipe: Recipe): void {
    this.favorites = this.favorites.filter(
      (fav) => fav.idMeal !== recipe.idMeal
    );
    this.favoriteService.saveFavorites(this.favorites);
  }

  goToRecipe(favorite: Recipe) {
    this.router.navigate(["/recipe", favorite.idMeal]);
  }
}
