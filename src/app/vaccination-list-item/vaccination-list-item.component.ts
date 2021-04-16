import { Component, Input, OnInit } from "@angular/core";
import { Vaccination } from "../shared/vaccination";
import { ImpfserviceService } from "../shared/impfservice.service";

@Component({
  selector: "is-vaccination-list-item",
  templateUrl: "./vaccination-list-item.component.html"
})
export class VaccinationListItemComponent implements OnInit {
  @Input() vaccination: Vaccination;

  constructor(private is: ImpfserviceService) {}

  ngOnInit() {}
}
