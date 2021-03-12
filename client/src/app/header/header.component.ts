import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  logoutFromApplication(): void {
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
