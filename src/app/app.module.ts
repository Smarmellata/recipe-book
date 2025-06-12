import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { provideHttpClient } from "@angular/common/http";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { RecipeService } from "./services/recipe.service";
import { HeaderComponent } from "./components/header/header.component";
import { FoodSpinnerComponent } from "./components/food-spinner/food-spinner.component";

@NgModule({
  declarations: [AppComponent, HeaderComponent, FoodSpinnerComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [RecipeService, provideHttpClient()],
  bootstrap: [AppComponent],
})
export class AppModule {}
