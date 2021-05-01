import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../shared/authentication.service';
import { User } from '../shared/user';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'vs-user-list',
  templateUrl: './user-list.component.html'
})
export class UserListComponent implements OnInit {
  users: User[];

  constructor(private us: UserService, private authService: AuthenticationService) { }

  ngOnInit() {
    this.us.getAllUsers().subscribe(res => (this.users = res));
  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

}


