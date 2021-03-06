import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../shared/authentication.service';
import { User } from '../shared/user';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'tr.vs-user-list-item',
  templateUrl: './user-list-item.component.html'
})
export class UserListItemComponent implements OnInit {
  @Input() user: User;

  constructor(
    private authService: AuthenticationService,
    private us: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {}

  vaccinate() {
    this.us.vaccinate(this.user.id).subscribe(res => {
      this.ngOnInit();
    });
  }
}
