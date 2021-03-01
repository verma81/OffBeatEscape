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

  constructor(
    private loginService: LogInService,
    private router: Router,
    private spinner: NgxSpinnerService
    ) { }

  ngOnInit(): void {
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
        console.log(data);
        this.spinner.show();
        setTimeout(() => {
          this.spinner.hide();
          this.router.navigate(['/dashboard']);
        }, 3000);
      }
    });
  }

  /**
   * @memberof LoginComponent
   * log in with facebook
   */
  signInWithFB(): void {
    this.loginService.validateLoginFB().subscribe(data => {
      console.log(data);
    });
  }

  /**
   * @memberof LoginComponent
   * log in with google
   */
  signInWithGoogle(): void {
    this.loginService.validateLoginGoogle().subscribe(data => {
      console.log(data);
    });
  }

  /**
   * @memberof LoginComponent
   * go to sign up page
   */
  goToSignUp(): void {
    this.router.navigate(['/signup']);
  }

}
