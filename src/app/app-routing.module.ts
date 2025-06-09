import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RecipesHomeResolver } from "./containers/recipes-home/recipe-home.resolver";
import { RecipeDetailResolver } from "./containers/recipe-detail/recipe-detail.resolver.spec";

const routes: Routes = [
  { path: "", redirectTo: "/home", pathMatch: "full" },
  {
    path: "home",
    loadChildren: () =>
      import("./containers/recipes-home/recipes-home.module").then(
        (m) => m.RecipesHomeModule
      ),
    resolve: { recipes: RecipesHomeResolver },
  },
  {
    path: "recipes",
    loadChildren: () =>
      import("./containers/recipe-list/recipe-list.module").then(
        (m) => m.RecipeListModule
      ),
  },
  {
    path: "recipe/:id",
    loadChildren: () =>
      import("./containers/recipe-detail/recipe-detail.module").then(
        (m) => m.RecipeDetailModule
      ),
    resolve: { recipe: RecipeDetailResolver },
  },
  {
    path: "favorites",
    loadChildren: () =>
      import("./containers/favorites-recipes/favorites-recipes.module").then(
        (m) => m.FavoritesRecipesModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
