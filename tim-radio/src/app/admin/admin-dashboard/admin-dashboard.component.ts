import { User } from './../../user.model';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.less']
})
export class AdminDashboardComponent implements OnInit {

  userInfo: User;

  constructor(public auth: AuthService) { }

  ngOnInit(): void {
    this.getUserInfo();
  }

  getUserInfo() {
    this.auth.getUserValue().subscribe((user) => {
      this.userInfo = user;
    })
  }

}
