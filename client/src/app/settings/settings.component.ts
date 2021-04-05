import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  constructor() { }
  user: any;
  
  ngOnInit(): void {
    this.user = this.getLoggedInUser();
  }
  
  getLoggedInUser(): any {
    return JSON.parse(JSON.stringify(localStorage.getItem('currentUser')));
  }
  
}
