import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from '../commonservices/TokenService';
import { SignUpService } from '../signup/signup.service';
import { DashBoardService } from './dashboard.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(
    private router: Router,
    private dashboardService: DashBoardService,
    private tokenService: TokenService,
    private userService : SignUpService,
    ) { }

  ngOnInit(): void { }

  /**
   * @memberof DashboardComponent
   * Logs out the current user and deletes authentication token
   */
  logout(): void {
    this.dashboardService.logoutUser().subscribe( data => {
      console.log(data);
    });
    this.tokenService.deleteAuthenticationCookie('connect.sid');
    this.router.navigate(['/login']);
  }

  googleUserCheck(): void {
    this.userService.validateLoginGoogle().subscribe(data => {
      console.log(data);
    })
  }

  handlePage(e: any): void {
    console.log("call API" + e);
  }
}
