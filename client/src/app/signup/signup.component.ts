import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { TokenService } from '../commonservices/TokenService';
import { UserCredentials } from '../login/login.model';
import { SignUpService } from './signup.service';
import { SignUpResponseModel } from './signupresponse.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  passwordMatchError: boolean = false;
  signedUpSuccessfully: boolean = false;

  constructor(
    private router: Router,
    private spinner: NgxSpinnerService, 
    private signUpService: SignUpService,
    private tokenService: TokenService
  ) { }

  credentials: UserCredentials = {
    password: '',
    username: '',
    confirmPassword: ''
  };

  ngOnInit(): void {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 1000);
  }

  onSignUpClick(): void {
    this.signUpService.registerUser(this.credentials).subscribe((data: SignUpResponseModel) => {
      if (data) {
        console.log(data);
        this.spinner.show();
        setTimeout(() => {
          this.spinner.hide();
          this.signedUpSuccessfully = true;
          this.tokenService.setJWTTokenInLocalStorage(data);
          this.tokenService.setJWTTokenInCookie(data);
        }, 3000);
      }
    });
  }

  goToLogin(): void {
    this.router.navigate(['/login']);
  }

}
