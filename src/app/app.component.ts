import { Component, VERSION } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from './shared/authentication.service';
import { User, Vaccination } from './shared/user';
import { UserService } from './shared/user.service';

@Component({
  selector: 'vs-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  listOn = true;
  detailsOn = false;
  user: User;

  vaccination: Vaccination;

   constructor(private authService: AuthenticationService, private us: UserService) {}


  ngOnInit() {
    this.us.getUser(this.authService.getUserId()).subscribe(user => {
      this.user = user;
    });
  }
  
  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  getLoginLabel() {
    if (this.isLoggedIn()) {
      return 'Logout';
    } else {
      return 'Login';
    }
  }
}
