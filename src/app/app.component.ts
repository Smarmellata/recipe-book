import { Component } from "@angular/core";
import { Observable } from "rxjs";
import { SpinnerService } from "./services/spinner.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
})
export class AppComponent {
  loading$: Observable<boolean>;
  constructor(private spinner: SpinnerService) {
    this.loading$ = this.spinner.loading$;
  }
}
