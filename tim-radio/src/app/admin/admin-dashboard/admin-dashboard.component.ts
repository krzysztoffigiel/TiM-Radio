import { Router } from '@angular/router';
// import { User } from './../../user.model';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from "../../shared/services/user";
import { GreetingsService } from 'src/app/greetings.service';
import { Greetings } from 'src/app/models/greetings.model';
import * as moment from 'moment';
@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.less']
})
export class AdminDashboardComponent implements OnInit {

  userInfo: User;
  greetingsList: Array<Greetings> = [];

  constructor(public auth: AuthService, private router: Router, public greetingsService: GreetingsService) { }

  ngOnInit(): void {
    this.getUserInfo();
    this.getGreetings();
    moment.locale('pl');
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
      console.log('Greetings from admin dashboard: ', this.greetingsList)
    })
  }

  changeGreetingStatus(greeting) {
    this.greetingsService.updateGreetingStatus(greeting);
  }

  sortGreetingsByDate(greetingsArray) {
    return greetingsArray.sort((a, b) => {
      return b?.date?.seconds - a?.date?.seconds;
    })
  }

  checkLastGreetings(date) {
    var currentDate = moment();
    var diff = currentDate.diff(moment.unix(date), 'h')

    if(diff <= 24) return true;
    else return false;
  }

  parseDate(date) {
    return moment.unix(date).format('dddd, MMMM Do, YYYY h:mm:ss A');
  }

  parseDateFromNow(date) {
    return moment.unix(date).fromNow();
  }

  getUserInfo() {
    this.userInfo = JSON.parse(localStorage.getItem('user'));
  }

  navigateTo(url: any) {
    this.router.navigate(url);
  }

}
