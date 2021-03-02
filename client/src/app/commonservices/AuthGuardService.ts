import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { TokenService } from './TokenService';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(
    private router: Router,
    private tokenService: TokenService
  ) {}

  /**
   * @memberof AuthGuardService
   * Will not allow unauthorized user to access components
   */
  canActivate(): boolean {
    if (this.tokenService.isLoggedIn()){
        return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
