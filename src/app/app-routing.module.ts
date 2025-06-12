import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  { path: "", redirectTo: "/home", pathMatch: "full" },
  {
    path: "home",
    loadChildren: () =>
      import("./containers/recipes-home/recipes-home.module").then(
        (m) => m.RecipesHomeModule
      ),
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
