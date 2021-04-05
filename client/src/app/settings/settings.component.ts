import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.user = this.getLoggedInUser();
  }
  getLoggedInUser(): any {
    return JSON.parse(localStorage.getItem('currentUser'));
  }
}
