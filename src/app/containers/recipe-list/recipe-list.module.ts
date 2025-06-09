import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RecipeListComponent } from "./recipe-list.component";
import { RecipeCardModule } from "../../components/recipe-card/recipe-card.module";
import { RouterModule } from "@angular/router";
import { SearchBarModule } from "../../components/search-bar/search-bar.module";

@NgModule({
  declarations: [RecipeListComponent],
  imports: [
    CommonModule,
    RecipeCardModule,
    SearchBarModule,
    RouterModule.forChild([{ path: "", component: RecipeListComponent }]),
  ],
  exports: [RecipeListComponent],
})
export class RecipeListModule {}
