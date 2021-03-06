import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { auth } from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";
import { User } from "../shared/services/user";

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  user: User;
  userData: any; // Save logged in user data

  constructor(public afAuth: AngularFireAuth, public router: Router, public afs: AngularFirestore, public ngZone: NgZone) {
    
    this.afAuth.authState.subscribe(user => {
      console.log('User from authState: ', user)
      if (user) {
        console.log('Jest user')
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'));
      } else {
        console.log('Nie ma usera')
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    });

  }

  login(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password).then((result) => {
      this.ngZone.run(() => {
        console.log('Wszedlem w ngZone: ', result)
        this.router.navigate(['admin-panel']);
      });
      this.SetUserData(result.user);
    }).catch((err) => {
      window.alert(err.message);
    });
  }

  register(email: string, password: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password).then((result) => {
      this.sendEmailVerification();
      // this.SetUserData(result.user);
    }).catch((err) => {
      window.alert(err.message); 
    })
  }

  sendEmailVerification() {
    return this.afAuth.auth.currentUser.sendEmailVerification().then(() => {
      this.router.navigate(['verify-email']);
    });
  }

  sendPasswordResetEmail(passwordResetEmail: string) {
    return this.afAuth.auth.sendPasswordResetEmail(passwordResetEmail).then(() => {
      window.alert('Hasło zostało zresetowane. Wysłaliśmy wiadomość na Twój adres e-mail.')
    }).catch((err) => {
      window.alert(err);
    });
  }

  logout() {
    return this.afAuth.auth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['']);
    })
  }

  get isLoggedIn(): boolean {
    console.log('IsloggedIn user: ', localStorage.getItem('user'))
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null) ? true : false;
  }

  SetUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified
    }
    return userRef.set(userData, {
      merge: true
    })
  }



}
