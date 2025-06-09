import { Component, Input } from "@angular/core";

@Component({
  selector: "app-recipe-card",
  templateUrl: "./recipe-card.component.html",
  styleUrls: ["./recipe-card.component.css"],
})
export class RecipeCardComponent {
  @Input() name!: string;
  @Input() description!: string;
  @Input() imageUrl!: string;
  @Input() isFavorite: boolean = false;
  @Input() id!: string | number;
}
