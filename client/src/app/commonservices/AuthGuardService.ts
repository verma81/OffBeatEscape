import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { LogInService } from '../login/login.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(
    private router: Router,
    private http: HttpClient,
    private loginService: LogInService
  ) {}

  /**
   * @memberof AuthGuardService
   * Will not allow unauthorized user to access components
   */
  canActivate(): Promise<boolean> {
    return new Promise(res => {
      this.loginService.getUser().subscribe(
          (active) => {
              if (active) {
                  res(true);
              } else {
                  this.router.navigate(['/login']);
                  res(false);
              }
          },
          (error) => {
              this.router.navigate(['/login']);
              res(false);
          }
      );
    });
  }
}
