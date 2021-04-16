import { Component, OnInit } from "@angular/core";
import { Vaccination } from "../shared/vaccination";
import { ImpfserviceService } from "../shared/impfservice.service";

@Component({
  selector: "is-vaccination-list",
  templateUrl: "./vaccination-list.component.html"
})
export class VaccinationListComponent implements OnInit {
  vaccinations: Vaccination[];

  constructor(private is: ImpfserviceService) {}

  ngOnInit() {
    this.is.getAllVaccinations().subscribe(res => {
      this.vaccinations = res;
      console.log(this.vaccinations);
    });
  }
}
