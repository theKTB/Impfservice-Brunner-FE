import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../shared/authentication.service';
import { User, Vaccination } from '../shared/user';
import { UserService } from '../shared/user.service';
import { VaccinationFactory } from '../shared/vaccination-factory';
import { VaccinationService } from '../shared/vaccination.service';

@Component({
  selector: 'vs-vaccination-details',
  templateUrl: './vaccination-details.component.html'
})
export class VaccinationDetailsComponent implements OnInit {
  vaccination: Vaccination = VaccinationFactory.empty();
  user: User;

  constructor(
    private vs: VaccinationService,
    private authService: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router,
    private us: UserService
  ) {}

  ngOnInit() {
    const params = this.route.snapshot.params;
    this.vs
      .getVaccination(params['id'])
      .subscribe(res => (this.vaccination = res));
      let userId = this.authService.getUserId();
      if (userId){
      this.us.getUser(userId).subscribe(user => {
      this.user = user;});
    }
  }

  isLoggedIn() {
      return this.authService.isLoggedIn();
  }

  hasOpenSpots() {
    return this.vaccination.maxPatients > 0;
  }

  isBookedVaccination() {
    if(this.user != null && this.user.vaccination != null){
      return this.route.snapshot.params['id'] == this.user.vaccination.id;
    }
    return false;
  }

  bookVaccination() {
    if (confirm('Möchtest du dich wirklich für diesen Termin anmelden?')) {
      let vaccinationId = this.route.snapshot.params['id'];
      this.vs
        .associateVaccination(this.user.id, vaccinationId)
        .subscribe(res =>
          this.router.navigate(['../../vaccinations'], { relativeTo: this.route })
        );
    }
  }

  removeVaccination() {
    if (confirm('Möchtest du den Termin wirklich löschen?')) {
      this.vs
        .removeVaccination(this.vaccination.id)
        .subscribe(res =>
          this.router.navigate(['../'], { relativeTo: this.route })
        );
    }
  }
}
