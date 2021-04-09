import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-admin-verify-email',
  templateUrl: './admin-verify-email.component.html',
  styleUrls: ['./admin-verify-email.component.less']
})
export class AdminVerifyEmailComponent implements OnInit {

  constructor(public auth: AuthService) { }

  ngOnInit(): void {
  }

}
