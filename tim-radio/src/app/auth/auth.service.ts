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
      if (user) {
        this.user = user;
        localStorage.setItem('user', JSON.stringify(this.user));
        JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    });
    
  }

  login(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password).then((result) => {
      this.ngZone.run(() => {
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
      this.SetUserData(result.user);
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
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null && user.emailVerified !== false) ? true : false;
  }

  AuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
    .then((result) => {
       this.ngZone.run(() => {
          this.router.navigate(['dashboard']);
        })
      this.SetUserData(result.user);
    }).catch((error) => {
      window.alert(error)
    })
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
