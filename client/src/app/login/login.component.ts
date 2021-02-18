import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserCredentials, UserInterface } from './login.model';
import { LogInService } from './login.service';
import { SocialAuthService } from 'angularx-social-login';
import { FacebookLoginProvider, GoogleLoginProvider } from 'angularx-social-login';

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
    private authService: SocialAuthService) {
    }

  ngOnInit(): void {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 1000);
  }

  onLoginClick(): void {
    console.log(this.credentials.username);
    console.log(this.credentials.password);
    this.loginService.validateLogin().subscribe((data: UserInterface) => {
      if (data) {
        console.log(data);
        this.spinner.show();
        setTimeout(() => {
          this.spinner.hide();
          localStorage.setItem('logged_in_noramlly', '100');
          this.router.navigate(['/dashboard']);
        }, 3000);
      }
    });
  }

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signOut(): void {
    this.authService.signOut();
  }

  goToSignUp(): void {
    this.router.navigate(['/signup']);
  }

}
