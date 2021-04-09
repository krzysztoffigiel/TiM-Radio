import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.less']
})
export class AdminLoginComponent implements OnInit {

  form: FormGroup;
  submitted = false;

  constructor(public auth: AuthService, public router: Router) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      "login": new FormControl("", Validators.required),
      "password": new FormControl("", Validators.required),
    });
  }

  get f() { return this.form.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }
    this.auth.login(this.form.controls.login.value, this.form.controls.password.value);
    console.log("Login reactive form submitted");
    console.log(this.form.controls.login.value);
  }

}
