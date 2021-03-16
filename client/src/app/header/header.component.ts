import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderService } from './header.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {

  constructor(
    private router: Router,
    private headerService: HeaderService
  ) { }

  ngOnInit(): void {
  }

  logoutFromApplication(): void {
    this.headerService.logOutUser().subscribe(data => {});
    localStorage.removeItem("authenticated_user");
    this.router.navigate(['/login']);
  }

  goToAddPost(): void {
    this.router.navigate(['/addpost']);
  }

  goToMyPosts(): void {
    this.router.navigate(['/myposts'])
  }

  routeToDashboard(): void {
    this.router.navigate(['/dashboard'])
  }

}
