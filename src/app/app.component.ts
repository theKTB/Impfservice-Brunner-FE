import { Component, VERSION } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { AuthenticationService } from "./shared/authentication.service";
import { Vaccination } from "./shared/user";


@Component({
  selector: "vs-root",
  templateUrl: "./app.component.html"
})
export class AppComponent {
  listOn = true;
  detailsOn = false;

  vaccination: Vaccination;

  constructor(private authService: AuthenticationService) {}

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  isAdmin() {
    return this.authService.isAdmin();
  }

  getLoginLabel() {
    if (this.isLoggedIn()) {
      return "Logout";
    } else {
      return "Login";
    }
  }
}
