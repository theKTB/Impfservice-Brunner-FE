import { Component, VERSION } from "@angular/core";
import { Vaccination } from "./shared/user";

@Component({
  selector: "vs-root",
  templateUrl: "./app.component.html"
})
export class AppComponent {
  listOn = true;
  detailsOn = false;

  vaccination: Vaccination;

  showList() {
    this.listOn = true;
    this.detailsOn = false;
  }

  showDetails(vaccination: Vaccination) {
    this.vaccination = vaccination;
    this.listOn = false;
    this.detailsOn = true;
  }
}
