import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DashBoardService } from './dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private router: Router, private dashboardService: DashBoardService) { }

  ngOnInit(): void {
    localStorage.removeItem('logged_in_noramlly');
  }

  logout(): void {
    this.dashboardService.logoutUser().subscribe( data => {
      console.log(data);
    });
    this.router.navigate(['/login']);
  }

}
