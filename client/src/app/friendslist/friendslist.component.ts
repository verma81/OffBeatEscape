import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-friendslist',
  templateUrl: './friendslist.component.html',
  styleUrls: ['./friendslist.component.scss']
})
export class FriendslistComponent implements OnInit {

  friendName: string = "";
  friendsList: Array<any> = [];
  constructor() { }

  ngOnInit(): void {
    this.friendsList.push(
      {
        friendName: "Sid",
        friendRole: "friend"
      },
      {
        friendName: "Sid1",
        friendRole: "friend"
      },
      {
        friendName: "Sid1",
        friendRole: "friend"
      },
      {
        friendName: "Sid1",
        friendRole: "friend"
      },
      {
        friendName: "Sid1",
        friendRole: "friend"
      }
    )
  }

  calculateValue(): void {
    console.log(this.friendName);
  }

}
