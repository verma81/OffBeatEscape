import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { AuthGuardService as AuthGuard  } from './commonservices/AuthGuardService';
import { SignupComponent } from './signup/signup.component';


const arr: Routes = [
    {path: '', redirectTo: '/login', pathMatch: 'full'},
    {path: 'login', component: LoginComponent},
    {path: 'signup', component: SignupComponent},
    {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]}
];

export const routing = RouterModule.forRoot(arr);
