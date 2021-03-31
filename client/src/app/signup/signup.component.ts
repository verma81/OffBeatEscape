import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserCredentials } from '../login/login.model';
import { SignUpService } from './signup.service';
import { SignUpResponseModel } from './signupresponse.model';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    private signUpService: SignUpService,
    private snackBar: MatSnackBar
  ) { }

  /**
   * @memberof SignupComponent
   * used for storing user credentials
   */
  credentials: UserCredentials = {
    password: '',
    username: '',
    confirmPassword: '',
    email: ''  
  };

  myStyle: object = {};
  myParams: object = {};

  ngOnInit(): void {
    this.myStyle = {
      position: 'fixed',
      width: '100%',
      height: '100%',
      'z-index': -1,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    };
    this.myParams = {
      particles: {
        number: {
          value: 30,
          density: {
            enable: true,
            value_area: 800
          }
        },
        color: {
          value: '#000000'
        },
        shape: {
          type: 'circle',
          stroke: {
            width: 0,
            color: '#000000'
          },
          polygon: {
            nb_sides: 3
          },
        },
        opacity: {
          value: 0.5,
          random: false,
          anim: {
            enable: false,
            speed: 1,
            opacity_min: 0.1,
            sync: false
          }
        },
        size: {
          value: 3,
          random: true,
        },
        line_linked: {
          enable: true,
          distance: 150,
          color: '#000000',
          opacity: 0.4,
          width: 1
        },
      },
      retina_detect: true
    };
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
          this.snackBar.open("User signed up successfully", void 0, {duration: 3000});
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
    window.open('http://localhost:3000/auth/facebook', '_self');
    // this.signUpService.validateLoginFB().subscribe(data => {
    //   console.log(data);
    // });
  }

  /**
   * @memberof SignupComponent
   * sign in with Google
   */
  signInWithGoogle(): void {
    window.open('http://localhost:3000/auth/google', '_self');
    // this.signUpService.validateLoginGoogle().subscribe(data => {
    //   console.log(data);
    // });
  }

}
