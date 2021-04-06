import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
public user;
  constructor() {this.user=''; }

  ngOnInit(): void {
    this.user = this.getLoggedInUser();
    this.getLoggedInUser();
  }
  getLoggedInUser(): any {
    var user = JSON.parse(JSON.stringify(localStorage.getItem('currentUser')));
    return JSON.parse(user).username;

  }
}
