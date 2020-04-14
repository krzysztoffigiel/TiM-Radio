import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { RadioProgram } from '../radio-program.model';
import { RadioProgramService } from '../radio-program.service';
import { AuthService } from '../auth/auth.service';

import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

import * as firebase from 'firebase';
import 'firebase/firestore';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less']
})
export class DashboardComponent implements OnInit {

  radioProgramModel: Array<RadioProgram> = [];
  faEnvelope = faEnvelope;

  constructor(private radioProgram: RadioProgramService, public auth: AuthService, private router: Router) { }

  ngOnInit(): void {

    // radio program reading
    this.radioProgram.getRadioProgram().subscribe((data: any) => {
      this.radioProgramModel = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as RadioProgram
      })
    });

    console.log('this logged in: ', this.auth.isLoggedIn);
    // this.getServerData();

  }

  getServerData() {
    this.radioProgram.getServerData().subscribe((data: any[]) => {
      console.log("Server data: ", data);
    })
  }

  scrollToElement(destination): void {
    const element = document.querySelector(`#${destination}`);
    if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
  }

  navigateTo(url: any) {
    this.router.navigate(url);
  }

}
