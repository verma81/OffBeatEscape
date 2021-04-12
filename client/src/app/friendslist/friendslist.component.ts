import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DashBoardService } from '../dashboard/dashboard.service';

@Component({
  selector: 'app-friendslist',
  templateUrl: './friendslist.component.html',
  styleUrls: ['./friendslist.component.scss']
})
export class FriendslistComponent implements OnInit {
  /**
   * @memberof FriendslistComponent
   * used for storing  user's name to filter based on search
   */
  friendName = '';
  /**
   * @memberof FriendslistComponent
   * used for storing users list
   */
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

  /**
   * @memberof FriendslistComponent
   * used for filtering users list to show only users to whom the logged in user has 
   * not sent a friend request
   */
  filterFriendsList(usersList: any): void {
    const alreadySentFriendRequestList: any = [];
    const currentUser = JSON.parse(this.getLoggedInUser());

    if (currentUser.friends && currentUser.friends.length > 0) {
      currentUser.friends.map((friendRequestSent: any) => {
        alreadySentFriendRequestList.push(friendRequestSent);
      });
    }

    if (alreadySentFriendRequestList && alreadySentFriendRequestList.length > 0) {
      for (let i = 0; i < usersList.length; i++) {
        for (let j = 0 ; j < alreadySentFriendRequestList.length; j++) {
          if (usersList[i]._id == alreadySentFriendRequestList[j]._id) {
            usersList[i].friendRequestSent = true;
          }
        }
      }
    }
    const tempUserList = usersList.filter((user: any) => {
      return (user.friendRequestSent !== true);
    });
    this.friendsList = tempUserList;
  }

  /**
   * @memberof FriendslistComponent
   * used to send friend request to a user
   */
  sendFriendRequestToUser(friend: any): void {
    const currentUser = JSON.parse(this.getLoggedInUser());
    const friendRequestPayLoad = {
      _id: friend._id
    };
    this.dashboardService.sendFriendRequest(currentUser, friendRequestPayLoad).subscribe(data => {
      this.snackBar.open("Friend Request Sent", void 0, {
        duration: 3000,
        horizontalPosition: 'center',
      });
    });
  }

  /**
   * @memberof FriendslistComponent
   * used to get current logged in user from local storage
   */
  getLoggedInUser(): any {
    return JSON.parse(JSON.stringify(localStorage.getItem('currentUser')));
  }
}
