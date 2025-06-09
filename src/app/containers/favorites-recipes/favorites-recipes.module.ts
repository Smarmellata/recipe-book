import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FavoritesRecipesComponent } from "./favorites-recipes.component";
import { RecipeCardModule } from "../../components/recipe-card/recipe-card.module";
import { RouterModule } from "@angular/router";
import { SearchBarModule } from "../../components/search-bar/search-bar.module";

@NgModule({
  declarations: [FavoritesRecipesComponent],
  imports: [
    CommonModule,
    RecipeCardModule,
    SearchBarModule,
    RouterModule.forChild([{ path: "", component: FavoritesRecipesComponent }]),
  ],
  exports: [FavoritesRecipesComponent],
})
export class FavoritesRecipesModule {}
