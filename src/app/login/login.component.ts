import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../shared/authentication.service';
import { User } from '../shared/user';
import { UserService } from '../shared/user.service';

interface Response {
  access_token: string;
}

@Component({
  selector: '.vs-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  user: User;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthenticationService,
    private us: UserService
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
    let userId = this.authService.getUserId();
    if (userId) {
      this.us.getUser(userId).subscribe(user => {
        this.user = user;
      });
    }
  }

  login() {
    const val = this.loginForm.value;
    if (val.username && val.password) {
      this.authService.login(val.username, val.password).subscribe(
        res => {
          this.authService.setLocalStorage((res as Response).access_token);
          this.us.getUser(this.authService.getUserId()).subscribe(user => {
            this.user = user;
          });
        },
        err => {
          console.log(err);
        }
      );
    }
  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  logout() {
    this.authService.logout();
  }
}
