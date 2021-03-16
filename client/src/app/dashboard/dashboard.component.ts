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
    this.http.get('http://localhost:3000/post/getAllPosts').subscribe((data) => {
      if(data){
        this.posts = Object.values(data)
        console.log(this.posts)
        for (p of this.posts){
          console.log(p['savedBy'])
        }
      } else {
        this.posts = []
      }
    })
    var p

  }



  showFriendsList():void {
    this.router.navigate(['/friendslist']);
  }

  handlePage(e: any): void {
    console.log("call API" + e);
  }

}
