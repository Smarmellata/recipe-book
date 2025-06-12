import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RecipesHomeComponent } from "./recipes-home.component";
import { RecipeCardModule } from "../../components/recipe-card/recipe-card.module";
import { RouterModule, Routes } from "@angular/router";
import { recipesHomeResolver } from "./recipes-home.resolver";

const routes: Routes = [
  {
    path: "",
    component: RecipesHomeComponent,
    resolve: { recipes: recipesHomeResolver },
  },
];

@NgModule({
  declarations: [RecipesHomeComponent],
  imports: [CommonModule, RecipeCardModule, RouterModule.forChild(routes)],
  exports: [RecipesHomeComponent],
})
export class RecipesHomeModule {}
