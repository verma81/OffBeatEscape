import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { LoginModel, UserCredentials} from './login.model';
import { LogInService } from './login.service';
import { TokenService } from '../commonservices/TokenService';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  credentials: UserCredentials = {
    password: '',
    username: ''
  };

  constructor(
    private loginService: LogInService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private tokenService: TokenService) {
    }

  ngOnInit(): void {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 1000);
  }

  onLoginClick(): void {
    this.loginService.validateLogin(this.credentials).subscribe((data: LoginModel) => {
      if (data) {
        console.log(data);
        this.spinner.show();
        setTimeout(() => {
          this.spinner.hide();
          this.router.navigate(['/dashboard']);
        }, 3000);
      }
    });
  }

  signInWithFB(): void {
    this.loginService.validateLoginFB(this.credentials).subscribe(data => {
      console.log(data);
    })
  }

  signInWithGoogle(): void {
    this.loginService.validateLoginGoogle(this.credentials).subscribe(data => {
      console.log(data);
    })
  }

  signOut(): void {
    
  }

  goToSignUp(): void {
    this.router.navigate(['/signup']);
  }

}
