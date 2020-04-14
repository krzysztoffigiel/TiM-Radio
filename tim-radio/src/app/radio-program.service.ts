import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import * as firebase from 'firebase';
import 'firebase/firestore';

const headerDict = {
  'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Authorization': 'Basic YWRtaW46TW9qZXJhZGlvMTIz'
  // 'Access-Control-Allow-Origin' : '*'
}

const requestOptions = {                                                                                                                                                                                 
  headers: new HttpHeaders(headerDict), 
};

@Injectable({
  providedIn: 'root'
})

export class RadioProgramService {

  private REST_API_SERVER_URL = "http://s3.slotex.pl:7708/statistics?json=1";
  

  constructor(private firestore: AngularFirestore, private httpClient: HttpClient) { }

  getRadioProgram() {
    return this.firestore.collection('radio-program').snapshotChanges();
  }

  getServerData() {
    return this.httpClient.get(this.REST_API_SERVER_URL, requestOptions);
  }

}
