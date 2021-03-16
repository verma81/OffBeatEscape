import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGuardService } from '../commonservices/AuthGuardService';
import { LogInService } from '../login/login.service';
import { SignUpService } from '../signup/signup.service';
import { DashBoardService } from './dashboard.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public posts : any = [];
  public savedPosts = []
  constructor(
    private router: Router,
    private dashboardService: DashBoardService,
    private userService : SignUpService,
    private http: HttpClient,
    private loginservice: LogInService

    ) { }

  ngOnInit(): void {

  }



  showFriendsList():void {
    this.router.navigate(['/friendslist']);
  }

  handlePage(e: any): void {
    console.log("call API" + e);
  }

}
