import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { DashBoardService } from './dashboard.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public posts: any = [];
  public savedPosts = [];
  friendsList:any = [];
  usersList: any = [];
  savedPostsId: any = [];
  readingList: any = [];
  topTrendingPosts: any = [];

  generalFeedPosts: any = [];

  constructor(
    private router: Router,
    private dashboardService: DashBoardService,
    private snackBar: MatSnackBar
    ) { }

  ngOnInit(): void {
    this.getUsersList();
    this.getFriendsList();
    this.getFriendsPosts();
    this.getSavedPostsId();
    this.getSavedPostsContent();
    this.getTopTrendingPosts();
  }

  showFriendsList(): void {
    this.router.navigate(['/friendslist']);
  }

  handlePage(e: any): void {
    console.log("call API" + e.pageIndex);
  }

  getUsersList(): void {
    console.log('will fetch users list');
    this.dashboardService.getUsersList().subscribe(data => {
      this.usersList = data;
      this.filterFriendsList(data);
    });
  }

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
    this.usersList = tempUserList;
  }

  getFriendsList(){
    const currentUser = JSON.parse(this.getLoggedInUser());
    for(var i=0; i<currentUser['friends'].length; i++ ){
      this.friendsList.push(currentUser['friends'][i]['username'])
    }
    console.log('friend list is ' + this.friendsList)
  }

  getFriendsPosts(){
    for (var friend of this.friendsList){
      this.dashboardService.friendName = friend
      this.dashboardService.getFriendsPost().subscribe(data => {
        console.log(data)
        this.generalFeedPosts = data;
      })
    }
  }

  gotToDetailedPost(eachPost: any) {
    this.router.navigate(['postHeadingTitle', eachPost._id]);
  }

  sendFriendRequestToUser(user: any): void {
    const currentUser = JSON.parse(this.getLoggedInUser());
    console.log(user);
    console.log(currentUser);
    const sendFriendRequestPayLoad = {
      _id: user._id
    };

    this.dashboardService.sendFriendRequest(currentUser, sendFriendRequestPayLoad).subscribe((data) => {
      if(data) {
        this.snackBar.open("Friend Request Sent", void 0, {
          duration: 3000,
          horizontalPosition: 'center',
        });
      }
    });
  }

  getSavedPostsId(){
    const currentUser = JSON.parse(this.getLoggedInUser());
    for (var i=0; i<currentUser.savedPosts.length; i++){
      this.savedPostsId.push(currentUser.savedPosts[i]['_id'])
    }
    console.log('saved posts are ' + this.savedPostsId)
  }

  getSavedPostsContent(){
    for (var postid of this.savedPostsId){
      this.dashboardService.postId = postid
      this.dashboardService.getSavedPosts().subscribe(data => {
        console.log(data)
        this.readingList.push(data)
      })
    }
  }

  getLoggedInUser(): any {
    return JSON.parse(JSON.stringify(localStorage.getItem('currentUser')));
  }

  getTopTrendingPosts(): void {
    this.dashboardService.getTopTrendingPosts().subscribe(data => {
      this.topTrendingPosts = data;
    })
  }

}
