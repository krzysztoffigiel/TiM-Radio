import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class RadioProgramService {

  constructor(private firestore: AngularFirestore) { }

  getRadioProgram() {
    return this.firestore.collection('radio-program').snapshotChanges();
  }
  
}
