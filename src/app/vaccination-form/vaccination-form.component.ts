import { Component, OnInit } from "@angular/core";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Vaccination } from "../shared/user";
import { VaccinationFactory } from "../shared/vaccination-factory";
import { VaccinationValidators } from "../shared/vaccination-validators";
import { VaccinationService } from "../shared/vaccinationservice.service";
import { VaccinationFormErrorMessages } from "./vaccination-form-error-messages";

@Component({
  selector: "avs-vaccination-form",
  templateUrl: "./vaccination-form.component.html"
})
export class VaccinationFormComponent implements OnInit {
  vaccinationForm: FormGroup;
  vaccination = VaccinationFactory.empty();
  isUpdatingVaccination = false;
  errors: { [key: string]: string } = {};
  locations: FormArray;

  constructor(
    private fb: FormBuilder,
    private vs: VaccinationService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.params["id"];
    if (id) {
      this.isUpdatingVaccination = true;
      this.vs.getVaccination(id).subscribe(vaccination => {
        this.vaccination = vaccination;
        this.initVaccination();
      });
    }
    this.initVaccination();
  }

  initVaccination() {
    this.vaccinationForm = this.fb.group({
      id: this.vaccination.id,
      from: [
        this.vaccination.from,
        [Validators.required, VaccinationValidators.datePast]
      ],
      to: [
        this.vaccination.to,
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
    console.log(this.vaccinationForm.value);

    const updatedVaccination: Vaccination = VaccinationFactory.fromObject(
      this.vaccinationForm.value
    );
    console.log(updatedVaccination);

    if (this.isUpdatingVaccination) {
      this.vs.updateVaccination(updatedVaccination).subscribe(
        res => {
          this.router.navigate(["../../vaccinations", updatedVaccination.id], {
            relativeTo: this.route
          });
        },
        err => {
          //TODO sinnvolle Fehlermeldung
        }
      );
    } else {
      this.vs.createVaccination(updatedVaccination).subscribe(res => {
        this.router.navigate(["../vaccinations"], { relativeTo: this.route });
      });
    }
  }
}
