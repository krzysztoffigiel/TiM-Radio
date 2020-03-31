import { Component, OnInit } from '@angular/core';
import { RadioProgram } from '../radio-program.model';
import { RadioProgramService } from '../radio-program.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less']
})
export class DashboardComponent implements OnInit {

  radioProgramModel: Array<RadioProgram> = [];

  constructor(private radioProgram: RadioProgramService, public auth: AuthService) { }

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

    // this.getServerData();

  }

  getServerData() {
    this.radioProgram.getServerData().subscribe((data: any[]) => {
      console.log("Server data: ", data);
    })
  }

}
