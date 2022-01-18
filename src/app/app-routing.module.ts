import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FavouriteComponent } from './favourite/favourite.component';
import { HomeComponent } from './home/home.component';
import { LogInComponent } from './log-in/log-in.component';

import { RegisterComponent } from './register/register.component';
import { AuthGuardService } from './services/auth-guard.service';
const routes: Routes = [
  {path:'',component:HomeComponent},
  { path: 'home', component:HomeComponent},
  { path: 'login', component: LogInComponent },
  { path: 'register', component: RegisterComponent },
  {
    path:'dashboard',
    component:DashboardComponent,
    canActivate: [AuthGuardService],
  },

  {path:'favourite',component:FavouriteComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
