import { Component, OnDestroy, OnInit } from "@angular/core";
import { RecipeService } from "../../services/recipe.service";
import { Recipe } from "../../models/recipe.model";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-recipes-home",
  templateUrl: "./recipes-home.component.html",
  styleUrls: ["./recipes-home.component.css"],
})
export class RecipesHomeComponent implements OnInit, OnDestroy {
  favorites: Recipe[] = [];
  recipes: Recipe[] = [];
  currentIndex = 0;
  cardsPerView = 3;

  constructor(
    private recipesService: RecipeService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    // The recipes will be loaded in ngOnInit using the resolver
  }

  ngOnInit(): void {
    this.recipes = this.route.snapshot.data["recipes"] || [];
    this.favorites = this.recipesService.getFavorites() || [];
    this.updateCardsPerView();
    window.addEventListener("resize", this.updateCardsPerView.bind(this));
  }

  ngOnDestroy(): void {
    window.removeEventListener("resize", this.updateCardsPerView.bind(this));
  }

  updateCardsPerView() {
    if (window.innerWidth < 700) {
      this.cardsPerView = 1;
    } else if (window.innerWidth < 1000) {
      this.cardsPerView = 2;
    } else {
      this.cardsPerView = 3;
    }
  }

  get visibleRecipes() {
    const result = [];
    for (let i = 0; i < this.cardsPerView; i++) {
      if (this.recipes.length > 0) {
        result.push(
          this.recipes[(this.currentIndex + i) % this.recipes.length]
        );
      }
    }
    return result;
  }

  prev() {
    this.currentIndex =
      this.currentIndex === 0 ? this.recipes.length - 1 : this.currentIndex - 1;
  }

  next() {
    this.currentIndex =
      this.currentIndex === this.recipes.length - 1 ? 0 : this.currentIndex + 1;
  }

  isFavorite(recipe: Recipe): boolean {
    return this.favorites.some((fav) => fav.idMeal === recipe.idMeal);
  }

  goToRecipe(recipe: Recipe) {
    this.router.navigate(["/recipe", recipe.idMeal]);
  }
}
