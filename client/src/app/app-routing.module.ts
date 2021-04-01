import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { AuthGuardService as AuthGuard  } from './commonservices/AuthGuardService';
import { SignupComponent } from './signup/signup.component';
import { PostHeadingComponent } from './post-heading/post-heading.component';
import { FriendslistComponent } from './friendslist/friendslist.component';
import { AddpostComponent } from './addpost/addpost.component';
import { MypostsComponent } from './myposts/myposts.component';
import { EditpostComponent } from './editpost/editpost.component';
import { SettingsComponent } from './settings/settings.component';

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  {path: 'postHeadingTitle/:pid', component: PostHeadingComponent, canActivate: [AuthGuard]},
  {path: 'friendslist', component: FriendslistComponent, canActivate: [AuthGuard]},
  {path: 'addpost', component: AddpostComponent, canActivate: [AuthGuard]},
  {path: 'myposts', component: MypostsComponent, canActivate: [AuthGuard]},
  {path: 'editpost/:pid',component: EditpostComponent, canActivate: [AuthGuard]},
  {path: 'settings', component: SettingsComponent, canActivate: [AuthGuard]}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
