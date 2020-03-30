import { RadioProgram } from './radio-program.model';
import { RadioProgramService } from './radio-program.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {

  radioProgramModel: Array<RadioProgram> = [];

  constructor(private radioProgram: RadioProgramService) { }

  ngOnInit() {

    // radio program reading
    this.radioProgram.getRadioProgram().subscribe((data: any) => {
      this.radioProgramModel = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as RadioProgram
      })
    });

  }

}
