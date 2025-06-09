import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RecipeCardComponent } from "./recipe-card.component";

@NgModule({
  declarations: [RecipeCardComponent],
  imports: [CommonModule],
  exports: [RecipeCardComponent],
})
export class RecipeCardModule {}
