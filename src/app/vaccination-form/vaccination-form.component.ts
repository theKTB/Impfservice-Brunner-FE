
import { Component, OnInit } from "@angular/core";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Location } from "../shared/location";
import { LocationService } from "../shared/location.service";
import { Vaccination } from "../shared/user";
import { VaccinationFactory } from "../shared/vaccination-factory";
import { VaccinationValidators } from "../shared/vaccination-validators";
import { VaccinationService } from "../shared/vaccination.service";

import { VaccinationFormErrorMessages } from "./vaccination-form-error-messages";


@Component({
  selector: "vs-vaccination-form",
  templateUrl: "./vaccination-form.component.html"
})
export class VaccinationFormComponent implements OnInit {
  vaccinationForm: FormGroup;
  vaccination = VaccinationFactory.empty();
  isUpdatingVaccination = false;
  errors: { [key: string]: string } = {};
  locations: Location[];
  localFromDate: Date;
  localFromString: string;
  localToDate: Date;
  localToString: string;

  constructor(
    private fb: FormBuilder,
    private vs: VaccinationService,
    private route: ActivatedRoute,
    private router: Router,
    private ls: LocationService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.params["id"];
    console.log("Termin Id ist: " + id);
    this.ls.getAllLocations().subscribe(locations => {
      this.locations = locations;
    })
    if (id) {
      this.isUpdatingVaccination = true;
      this.vs.getVaccination(id).subscribe(vaccination => {
        this.vaccination = vaccination;
        console.log(this.vaccination);
        this.initVaccination();
      });
    }
    this.initVaccination();
  }

  // Tansforms date into ISO string including timezone information
  toISOLocal(d) {
    const z = n => ('0' + n).slice(-2);
    let off = d.getTimezoneOffset();
    const sign = off < 0 ? '+' : '-';
    off = Math.abs(off);
    return new Date(d.getTime() - (d.getTimezoneOffset() * 60000)).toISOString().slice(0, -1) + sign + z(off / 60 | 0) + ':' + z(off % 60);
  }

  initVaccination() {
    //preparing dates
    this.localFromDate = new Date(this.vaccination.from);
    this.localFromString = this.toISOLocal(this.localFromDate).slice(0,-6);
    this.localToDate = new Date(this.vaccination.to);
    this.localToString = this.toISOLocal(this.localToDate).slice(0,-6);

    this.vaccinationForm = this.fb.group({
      id: this.vaccination.id,
      from: [this.localFromString,
        [Validators.required, VaccinationValidators.datePast]
      ],
      to: [
        this.localToString,
        [Validators.required, VaccinationValidators.datePast]
      ],
      maxPatients: this.vaccination.maxPatients,
      location: this.vaccination.location
    });
    this.vaccinationForm.statusChanges.subscribe(() => {
      this.updateErrorMessages();
    });
  }

  updateErrorMessages() {
    this.errors = {};
    for (const message of VaccinationFormErrorMessages) {
      const control = this.vaccinationForm.get(message.forControl);
      if (
        control &&
        control.dirty &&
        control.invalid &&
        control.errors[message.forValidator] &&
        !this.errors[message.forControl]
      ) {
        this.errors[message.forControl] = message.text;
      }
    }
  }

  submitForm() {
    const val = this.vaccinationForm.value;

    // manuelles Mapping notwendig
    this.vaccination.from = val.from;
    this.vaccination.to = val.to;
    this.vaccination.location_id = val.location;
    this.vaccination.maxPatients = val.maxPatients;

    if (this.isUpdatingVaccination) {
      this.vs.updateVaccination(this.vaccination).subscribe(res => {
        this.router.navigate(['../../vaccinations', this.vaccination.id], {
          relativeTo: this.route
        });
      });
    } else {
      this.vs.createVaccination(this.vaccination).subscribe(res => {
        this.router.navigate(['../vaccinations'], {
          relativeTo: this.route
        });
      });
    }
  }
}
