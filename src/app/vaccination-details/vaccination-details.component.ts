import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Vaccination } from "../shared/user";
import { VaccinationFactory } from "../shared/vaccination-factory";
import { VaccinationService } from "../shared/vaccinationservice.service";



@Component({
  selector: "vs-vaccination-details",
  templateUrl: "./vaccination-details.component.html"
})
export class VaccinationDetailsComponent implements OnInit {
  vaccination: Vaccination = VaccinationFactory.empty();

  constructor(
    private vs: VaccinationService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const params = this.route.snapshot.params;
    this.vs.getVaccination(params['id']).subscribe(res => (this.vaccination = res));
  }
}
