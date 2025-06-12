import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RecipeDetailComponent } from "./recipe-detail.component";
import { RouterModule } from "@angular/router";
import { recipeDetailResolver } from "./recipe-detail.resolver";

@NgModule({
  declarations: [RecipeDetailComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: "",
        component: RecipeDetailComponent,
        resolve: { recipe: recipeDetailResolver },
      },
    ]),
  ],
  exports: [RecipeDetailComponent],
})
export class RecipeDetailModule {}
