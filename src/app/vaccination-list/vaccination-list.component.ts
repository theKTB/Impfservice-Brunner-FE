import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { Vaccination } from "../shared/vaccination";
import { VaccinationService } from "../shared/vaccinationservice.service";

@Component({
  selector: "vs-vaccination-list",
  templateUrl: "./vaccination-list.component.html"
})
export class VaccinationListComponent implements OnInit {
  vaccinations: Vaccination[];

  @Output() showDetailsEvent = new EventEmitter<Vaccination>();

  constructor(private vs: VaccinationService) {}

  showDetails(vaccination: Vaccination) {
    this.showDetailsEvent.emit(vaccination);
  }

  ngOnInit() {
    this.vs.getAllVaccinations().subscribe(res => {
      this.vaccinations = res;
      console.log(this.vaccinations);
    });
  }
}
