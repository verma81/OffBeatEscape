import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { LoginModel, UserCredentials} from './login.model';
import { LogInService } from './login.service';
import { SocialAuthService } from 'angularx-social-login';
import { FacebookLoginProvider, GoogleLoginProvider } from 'angularx-social-login';
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
    private authService: SocialAuthService,
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
          this.tokenService.setJWTTokenInLocalStorage(data);
          this.tokenService.setJWTTokenInCookie(data);
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
