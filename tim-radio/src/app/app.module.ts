import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { environment } from 'src/environments/environment';
import { AngularFirestore } from '@angular/fire/firestore';
import { NgMarqueeModule } from 'ng-marquee';

import { HttpClientModule } from '@angular/common/http';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CallbackComponent } from './callback/callback.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ReactiveFormsModule } from '@angular/forms';
import { GreetingsListComponent } from './admin/greetings-list/greetings-list.component';
import { AdminRegisterComponent } from './admin/admin-register/admin-register.component';
import { AdminForgotPasswordComponent } from './admin/admin-forgot-password/admin-forgot-password.component';
import { AdminVerifyEmailComponent } from './admin/admin-verify-email/admin-verify-email.component';
import { AuthService } from './auth/auth.service';
import { GreetingDeleteModalComponent } from './admin/greeting-delete-modal/greeting-delete-modal.component';


@NgModule({
  declarations: [
    AppComponent,
    AdminLoginComponent,
    DashboardComponent,
    AdminDashboardComponent,
    CallbackComponent,
    NotFoundComponent,
    GreetingsListComponent,
    AdminRegisterComponent,
    AdminForgotPasswordComponent,
    AdminVerifyEmailComponent,
    GreetingDeleteModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    HttpClientModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    NgMarqueeModule
  ],
  providers: [
    Title,
    AngularFirestore,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
