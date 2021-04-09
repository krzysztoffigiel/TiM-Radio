import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-admin-forgot-password',
  templateUrl: './admin-forgot-password.component.html',
  styleUrls: ['./admin-forgot-password.component.less']
})
export class AdminForgotPasswordComponent implements OnInit {

  constructor(public auth: AuthService) { }

  ngOnInit(): void {
  }

}
