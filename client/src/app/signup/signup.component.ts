import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserCredentials } from '../login/login.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  passwordMatchError: boolean = false;

  constructor(private router: Router, private spinner: NgxSpinnerService) { }

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

  }

  goToLogin(): void {
    this.router.navigate(['/login']);
  }

  validateConfirmPassword(): void {
    console.log("inside validate paswrod");
    if (this.credentials.password === this.credentials.confirmPassword) {
      console.log("user can register now");
    } else {
      console.log("logic working")
      this.passwordMatchError = true;
    } 
  }

}
