import { GreetingsService } from './../greetings.service';
import { Greetings } from './../models/greetings.model';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { RadioProgram } from '../radio-program.model';
import { RadioProgramService } from '../radio-program.service';
import { AuthService } from '../auth/auth.service';

import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

import 'firebase/firestore';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';

import * as moment from 'moment';
import * as firebase from 'firebase';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less']
})
export class DashboardComponent implements OnInit {

  radioProgramModel: Array<RadioProgram> = [];
  faEnvelope = faEnvelope;

  greetingsForm: FormGroup;
  submitted = false;
  greetingsModel: Greetings;
  greetingsList: Array<Greetings> = [];

  greetingsRef: AngularFireList<any>;
  greetingRef: AngularFireObject<any>;

  constructor(private radioProgram: RadioProgramService, public auth: AuthService, private router: Router,
    private formBuilder: FormBuilder, public greetingsService: GreetingsService, private greetingService: GreetingsService) { }

  ngOnInit(): void {

    this.greetingsForm = this.formBuilder.group({
      name: ['', Validators.required],
      text: ['', [Validators.required, Validators.minLength(10)]]
    });

    // radio program reading
    this.radioProgram.getRadioProgram().subscribe((data: any) => {
      this.radioProgramModel = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as RadioProgram
      })
    });

    this.getGreetings();

    // console.log('this logged in: ', this.auth.isLoggedIn);
    // this.getServerData();

  }

  getGreetings() {
    this.greetingsService.getGreetings().subscribe((data: any) => {
      this.greetingsList = (data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as Greetings
      })).sort((a, b) => {
        return b?.date?.seconds - a?.date?.seconds;
      })
      console.log(this.greetingsList)
    })
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

  onSubmit() {
    this.submitted = true;

    if (this.greetingsForm.invalid) {
      alert('Formularz zawiera błędy!'); // ToDo: mdb alert 
      return;
    } else {

      let timestamp = firebase.firestore.FieldValue.serverTimestamp()

      console.log('name: ', this.greetingsForm.get('name').value)
      this.greetingsModel = new Greetings(this.greetingsForm.get('name').value, this.greetingsForm.get('text').value, timestamp, false);

      this.greetingsService.addGreetings(this.greetingsModel);

      this.greetingsForm.reset();

      alert('Dziękujemy za wysłanie pozdrowień!'); // ToDo: mdb alert 
    }

  }

  get f() { return this.greetingsForm.controls; }

}
