import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "../shared/authentication.service";
import { Vaccination } from "../shared/vaccination";
import { VaccinationService } from "../shared/vaccinationservice.service";

@Component({
  selector: "vs-vaccination-list",
  templateUrl: "./vaccination-list.component.html"
})
export class VaccinationListComponent implements OnInit {
  vaccinations: Vaccination[];

  constructor(private vs: VaccinationService, private authService: AuthenticationService) {}


  ngOnInit() {
    this.vs.getAllVaccinations().subscribe(res => (this.vaccinations = res));
  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }


  
}
