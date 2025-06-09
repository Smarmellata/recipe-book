import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { RecipeService } from "../../services/recipe.service";
import { Recipe } from "../../models/recipe.model";

@Component({
  selector: "app-recipe-detail",
  templateUrl: "./recipe-detail.component.html",
  styleUrls: ["./recipe-detail.component.css"],
})
export class RecipeDetailComponent implements OnInit {
  recipe!: Recipe;
  isFavorite = false;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService
  ) {}

  ngOnInit(): void {
    this.recipe = this.route.snapshot.data["recipe"];
    if (this.recipe) {
      this.isFavorite = this.checkIfFavorite(this.recipe.idMeal);
    }
  }

  toggleFavorite() {
    if (!this.recipe) return;
    let favorites: Recipe[] = JSON.parse(
      localStorage.getItem("favorites") || "[]"
    );
    if (this.isFavorite) {
      favorites = favorites.filter(
        ({ idMeal }) => idMeal !== this.recipe.idMeal
      );
    } else {
      favorites.push(this.recipe);
    }
    localStorage.setItem("favorites", JSON.stringify(favorites));
    this.isFavorite = !this.isFavorite;
  }

  checkIfFavorite(id: string): boolean {
    const favorites: Recipe[] = JSON.parse(
      localStorage.getItem("favorites") || "[]"
    );
    return !!favorites.find((recipe) => id === recipe.idMeal);
  }
}
