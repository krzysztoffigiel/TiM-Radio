import { AdminForgotPasswordComponent } from './admin/admin-forgot-password/admin-forgot-password.component';
import { AdminRegisterComponent } from './admin/admin-register/admin-register.component';
import { GreetingsListComponent } from './admin/greetings-list/greetings-list.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CallbackComponent } from './callback/callback.component';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminVerifyEmailComponent } from './admin/admin-verify-email/admin-verify-email.component';
import { SecureInnerPagesGuard } from './shared/guard/secure-inner-pages.guard.ts.guard';
import { AuthGuard } from './shared/guard/auth.guard';


const routes: Routes = [
  { path: '', component: DashboardComponent, pathMatch: 'full' },
  { path: 'login', component: AdminLoginComponent},
  { path: 'register', component:  AdminRegisterComponent},
  { path: 'forgot-password', component:  AdminForgotPasswordComponent},
  { path: 'verify-email', component:  AdminVerifyEmailComponent},
  { path: 'admin-panel', component: AdminDashboardComponent, canActivate: [AuthGuard] },
  { path: 'callback', component: CallbackComponent},
  { path: '404', component: NotFoundComponent},
  { path: '**', redirectTo: '/404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
