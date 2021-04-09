import { GreetingsService } from './../../greetings.service';
import { Component, OnInit } from '@angular/core';
import { Greetings } from 'src/app/models/greetings.model';

import * as moment from 'moment';

@Component({
  selector: 'app-greetings-list',
  templateUrl: './greetings-list.component.html',
  styleUrls: ['./greetings-list.component.less']
})
export class GreetingsListComponent implements OnInit {

  greetingsModel: Greetings;

  constructor(public greetingsService: GreetingsService) { }

  ngOnInit(): void {
    console.log('Hello greetings list')
    this.getGreetings();
  }

  getGreetings() {
    this.greetingsService.getGreetings().subscribe((data: any) => {
      this.greetingsModel = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as Greetings
      })
    })
  }

  parseDate(date) {
    return new Date(date.toDate()).toLocaleString();
  }

}
