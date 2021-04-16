import { Component, OnInit } from "@angular/core";

@Component({
  selector: "is-vaccination-list",
  templateUrl: "./vaccination-list.component.html"
})
export class VaccinationListComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    this.is.getAllVaccinations().subscribe(res => {
      this.books = res;
      console.log(this.books);
    });
  }
}
