import { NotFoundComponent } from './not-found/not-found.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CallbackComponent } from './callback/callback.component';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';


const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'administrator', component: AdminLoginComponent },
  { path: 'callback', component: CallbackComponent },
  { path: 'admin-panel', component: AdminDashboardComponent, canActivate: [AuthGuard] },
  
  { path: '404', component: NotFoundComponent},
  { path: '**', redirectTo: '/404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
