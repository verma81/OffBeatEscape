import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { TokenService } from './TokenService';

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(
      private router: Router,
      private tokenService: TokenService
  ) {}

  canActivate(){
    if (this.tokenService.isLoggedIn() && localStorage.getItem('jwt-token')){
        return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
