import { Component, Input } from "@angular/core";

@Component({
  selector: "app-food-spinner",
  templateUrl: "./food-spinner.component.html",
  styleUrls: ["./food-spinner.component.css"],
})
export class FoodSpinnerComponent {
  @Input() show = false;
}
