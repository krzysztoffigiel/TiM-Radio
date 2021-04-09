import { Router } from '@angular/router';
// import { User } from './../../user.model';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from "../../shared/services/user";

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.less']
})
export class AdminDashboardComponent implements OnInit {

  userInfo: User;

  constructor(public auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.getUserInfo();
  }

  getUserInfo() {
    this.userInfo = JSON.parse(localStorage.getItem('user'));
  }

  navigateTo(url: any) {
    this.router.navigate(url);
  }

}
