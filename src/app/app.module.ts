import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { RecipeService } from "./services/recipe.service";
import { HeaderComponent } from "./components/header/header.component";
import { FoodSpinnerComponent } from "./components/food-spinner/food-spinner.component";

@NgModule({
  declarations: [AppComponent, HeaderComponent, FoodSpinnerComponent],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [RecipeService],
  bootstrap: [AppComponent],
})
export class AppModule {}
