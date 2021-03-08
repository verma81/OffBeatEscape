import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { AuthGuardService as AuthGuard  } from './commonservices/AuthGuardService';
import { SignupComponent } from './signup/signup.component';
import { PostHeadingComponent } from './post-heading/post-heading.component';
import { FriendslistComponent } from './friendslist/friendslist.component';

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  {path: 'postHeadingTitle', component: PostHeadingComponent, canActivate: [AuthGuard]},
  {path: 'friendslist', component: FriendslistComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
