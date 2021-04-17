import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Vaccination } from "../shared/user";

@Component({
  selector: "vs-home",
  templateUrl: "./home.component.html"
})
export class HomeComponent implements OnInit {
  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {}
}
