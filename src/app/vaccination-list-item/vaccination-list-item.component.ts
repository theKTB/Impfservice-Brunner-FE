import { Component, OnInit } from "@angular/core";
import { Vaccination } from "../shared/vaccination";
import { ImpfserviceService } from "../shared/impfservice.service";

@Component({
  selector: "isb-vaccination-list-item",
  templateUrl: "./vaccination-list-item.component.html"
})
export class VaccinationListItemComponent implements OnInit {
  vaccinations: Vaccination[];

  constructor(private isb: ImpfserviceService) {}

  ngOnInit() {}
}
