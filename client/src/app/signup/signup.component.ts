import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserCredentials } from '../login/login.model';
import { SignUpService } from './signup.service';
import { SignUpResponseModel } from './signupresponse.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  /**
   * @memberof SignupComponent
   * Boolean flag for password match error
   */
  passwordMatchError = false;

  /**
   * @memberof SignupComponent
   * used for showing a message if user successfully signed up
   */
  signedUpSuccessfully = false;

  constructor(
    private router: Router,
    private spinner: NgxSpinnerService,
    private signUpService: SignUpService
  ) { }

  /**
   * @memberof SignupComponent
   * used for storing user credentials
   */
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

  /**
   * @memberof SignupComponent
   * Used for registering a user
   */
  onSignUpClick(): void {
    this.signUpService.registerUser(this.credentials).subscribe((data: SignUpResponseModel) => {
      if (data) {
        console.log(data);
        this.spinner.show();
        setTimeout(() => {
          this.spinner.hide();
          this.signedUpSuccessfully = true;
        }, 3000);
      }
    });
  }

  /**
   * @memberof SignupComponent
   * go to login page
   */
  goToLogin(): void {
    this.router.navigate(['/login']);
  }

  /**
   * @memberof SignupComponent
   * sign in with Facebook
   */
  signInWithFB(): void {
    this.signUpService.validateLoginFB().subscribe(data => {
      console.log(data);
    });
  }

  /**
   * @memberof SignupComponent
   * sign in with Google
   */
  signInWithGoogle(): void {
    this.signUpService.validateLoginGoogle().subscribe(data => {
      console.log(data);
    });
  }

}
