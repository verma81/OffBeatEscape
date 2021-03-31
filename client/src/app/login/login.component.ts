import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { LoginModel, UserCredentials} from './login.model';
import { LogInService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  /**
  * @memberof LoginComponent
  * Used for storing user credentials
  */
  credentials: UserCredentials = {
    password: '',
    username: ''
  };

  myStyle: object = {};
  myParams: object = {};

  constructor(
    private loginService: LogInService,
    private router: Router,
    private spinner: NgxSpinnerService
    ) { }

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
   * @memberof LoginComponent
   * validates a user with his/her credentials
   */
  onLoginClick(): void {
    this.loginService.validateLogin(this.credentials).subscribe((data: LoginModel) => {
      if (data) {
        // this.getUser();
        console.log(data);
        this.spinner.show();
        setTimeout(() => {
          this.spinner.hide();
          this.router.navigate(['/dashboard']);
        }, 3000);
      } else {
        console.log("");
      }
    });
  }

  /**
   * @memberof LoginComponent
   * log in with facebook
   */
  signInWithFB(): void {
    // this.loginService.validateLoginFB().subscribe(data => {
    //   console.log(data);
    // });
    window.open('http://localhost:3000/auth/facebook', '_self');

  }

  /**
   * @memberof LoginComponent
   * log in with google
   */
  signInWithGoogle(): void {
    window.open('http://localhost:3000/auth/google', '_self');
    // this.loginService.validateLoginGoogle().subscribe(data => {
    //   console.log(data);
    // });
  }

  /**
   * @memberof LoginComponent
   * go to sign up page
   */
  goToSignUp(): void {
    this.router.navigate(['/signup']);
  }

  // getUser(): void {
  //   console.log(JSON.parse(JSON.stringify(localStorage.getItem("authenticated_user"))));
  //   this.loginService.getUser().subscribe(data => {
  //     localStorage.setItem("authenticated_user", JSON.stringify(data));
  //     console.log(data);
  //   });
  // }

}
