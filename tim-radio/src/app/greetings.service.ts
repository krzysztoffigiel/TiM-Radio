import { Greetings } from './models/greetings.model';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class GreetingsService {

  constructor(private firestore: AngularFirestore) { }

  addGreetings(greetingsModel: Greetings) {
    this.firestore.collection('greetings').add({
      name: greetingsModel.name,
      text: greetingsModel.text,
      date: greetingsModel.date,
      active: greetingsModel.active
    })
  }

  getGreetings() {
    return this.firestore.collection('greetings').snapshotChanges();
  }

  deleteGreeting(greeting) {
    return this.firestore.collection('greetings').doc(greeting.payload.doc.id).delete();
  }

  updateGreetingStatus(greeting) {
    return this.firestore.collection('greetings').doc(greeting.id).update({ active: !greeting?.active });
  }

}
