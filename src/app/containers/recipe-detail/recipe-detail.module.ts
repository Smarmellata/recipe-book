import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RecipeDetailComponent } from "./recipe-detail.component";
import { RouterModule } from "@angular/router";

@NgModule({
  declarations: [RecipeDetailComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: "", component: RecipeDetailComponent }]),
  ],
  exports: [RecipeDetailComponent],
})
export class RecipeDetailModule {}
