import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DashBoardService } from '../dashboard/dashboard.service';

@Component({
  selector: 'app-friendslist',
  templateUrl: './friendslist.component.html',
  styleUrls: ['./friendslist.component.scss']
})
export class FriendslistComponent implements OnInit {

  friendName: string = "";

  friendsList: Array<any> = [];

  constructor(
    private dashboardService: DashBoardService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.dashboardService.getUsersList().subscribe(data => {
      this.friendsList = data;
      this.filterFriendsList(data);
    });
  }

  filterFriendsList(usersList: any): void {
    const alreadySentFriendRequestList: any = [];
    const currentUser = JSON.parse(this.getLoggedInUser());
    
    if(currentUser.friends && currentUser.friends.length > 0) {
      currentUser.friends.map((friendRequestSent: any) => {
        alreadySentFriendRequestList.push(friendRequestSent);
      });
    }
    
    if(alreadySentFriendRequestList && alreadySentFriendRequestList.length > 0) {
      for(var i = 0; i < usersList.length; i++) {
        for(var j = 0 ; j < alreadySentFriendRequestList.length; j++) {
          if(usersList[i]._id == alreadySentFriendRequestList[j]._id) {
            console.log("foud", usersList[i]._id, i);
            usersList[i]['friendRequestSent'] = true;
          }
        }
      }
    }
    
    const tempUserList = usersList.filter((user: any) => {
      return (!user.friendRequestSent === true)
    });


    if(tempUserList && tempUserList.length > 0) {
      this.friendsList = tempUserList;
    }
    
  }

  sendFriendRequestToUser(friend: any): void {
    const currentUser = JSON.parse(this.getLoggedInUser());
    const friendRequestPayLoad = {
      '_id': friend._id
    }
    this.dashboardService.sendFriendRequest(currentUser, friendRequestPayLoad).subscribe(data => {
      this.snackBar.open("Friend Reuquest Sent", void 0, {
        duration: 3000,
        horizontalPosition: 'center',
      });
    });
  }

  getLoggedInUser(): any {
    return JSON.parse(JSON.stringify(localStorage.getItem('currentUser')));
  }

}
