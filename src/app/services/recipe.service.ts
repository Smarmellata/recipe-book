import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { forkJoin, Observable } from "rxjs";
import { Recipe } from "../models/recipe.model";
import { finalize, map } from "rxjs/operators";
import { ApiRecipe, mapApiRecipeToRecipe } from "./recipe.mapper";
import { SpinnerService } from "./spinner.service";

export interface ApiResponse {
  meals: ApiRecipe[];
}

@Injectable({
  providedIn: "root",
})
export class RecipeService {
  private apiUrl = "https://www.themealdb.com/api/json/v1/1/";

  constructor(private http: HttpClient, private spinner: SpinnerService) {}

  private callAndMap(finalUrl: string): Observable<Recipe[]> {
    this.spinner.show();

    const start = Date.now();
    return this.http.get<ApiResponse>(finalUrl).pipe(
      map((response) =>
        response.meals?.map((meal) => mapApiRecipeToRecipe(meal))
      ),
      finalize(() => {
        const elapsed = Date.now() - start;
        setTimeout(() => this.spinner.hide(), Math.max(0, 800 - elapsed));
      })
    );
  }

  searchRecipesByName(recipeName: string): Observable<Recipe[]> {
    return this.callAndMap(`${this.apiUrl}search.php?s=${recipeName}`);
  }

  filterRecipesByIngredient(ingredientName: string): Observable<Recipe[]> {
    return this.callAndMap(`${this.apiUrl}filter.php?i=${ingredientName}`);
  }

  filterRecipesByCategory(categoryName: string): Observable<Recipe[]> {
    return this.callAndMap(`${this.apiUrl}filter.php?c=${categoryName}`);
  }

  filterRecipesByArea(areaName: string): Observable<Recipe[]> {
    return this.callAndMap(`${this.apiUrl}filter.php?a=${areaName}`);
  }

  getRecipeDetails(id: string): Observable<Recipe> {
    return this.callAndMap(`${this.apiUrl}lookup.php?i=${id}`).pipe(
      map((recipes) => recipes[0])
    );
  }

  getRandomRecipe(): Observable<Recipe> {
    return this.callAndMap(`${this.apiUrl}random.php`).pipe(
      map((response) => response[0])
    );
  }

  getRandomRecipes(n: number): Observable<Recipe[]> {
    //used this trick since the API to have multiple randoms recipes is just for premium users
    const requests = Array.from({ length: n }, () => this.getRandomRecipe());
    return forkJoin(requests);
  }

  getFavorites(): Recipe[] {
    const favorites: Recipe[] = JSON.parse(
      localStorage.getItem("favorites") || "[]"
    );
    return favorites;
  }

  getSingleFavorite(id: string): Recipe | null {
    const favorites: Recipe[] = JSON.parse(
      localStorage.getItem("favorites") || "[]"
    );
    return favorites.find((recipe) => recipe.idMeal === id) || null;
  }

  saveFavorites(favorites: Recipe[]): void {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }
}
