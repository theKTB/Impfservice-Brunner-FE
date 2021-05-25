import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "../shared/authentication.service";
import { User } from "../shared/user";
import { UserService } from "../shared/user.service";
import { Vaccination } from "../shared/vaccination";
import { VaccinationService } from "../shared/vaccination.service";

@Component({
  selector: "vs-vaccination-list",
  templateUrl: "./vaccination-list.component.html"
})
export class VaccinationListComponent implements OnInit {
  vaccinations: Vaccination[];
  user: User;

  constructor(private vs: VaccinationService, private authService: AuthenticationService, private us: UserService) {}


  ngOnInit() {
    this.vs.getAllVaccinations().subscribe(res => (this.vaccinations = res));
    let userId = this.authService.getUserId();
    if (userId){
      this.us.getUser(userId).subscribe(user => {
      this.user = user;});
    }
  }

  isLoggedIn() {
      return this.authService.isLoggedIn();
  }
  
}
