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
  /**
   * @memberof DashBoardComponent
   * used for storing posts array
   */
  public posts: any = [];
  /**
   * @memberof DashBoardComponent
   * used for storing saved posts array
   */
  public savedPosts = [];
  /**
   * @memberof DashBoardComponent
   * used for storing friendslist array
   */
  friendsList:any = [];
  /**
   * @memberof DashBoardComponent
   * used for storing user lists array
   */
  usersList: any = [];
  /**
   * @memberof DashBoardComponent
   * used for storing saved posts ids as an array
   */
  savedPostsId: any = [];
  /**
   * @memberof DashBoardComponent
   * used for storing reading list items
   */
  readingList: any = [];
  /**
   * @memberof DashBoardComponent
   * used for storing top trending posts as an array
   */
  topTrendingPosts: any = [];
  /**
   * @memberof DashBoardComponent
   * used for storing general feed posts as an array
   */
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

  /**
   * @memberof DashBoardComponent
   * used for routing to friends list component
   */
  showFriendsList(): void {
    this.router.navigate(['/friendslist']);
  }

  /**
   * @memberof DashBoardComponent
   * used for handling pagination requests
   */
  handlePage(e: any): void {
    console.log("call API" + e.pageIndex);
  }

  /**
   * @memberof DashBoardComponent
   * used for getting usrs list from API
   */
  getUsersList(): void {
    this.dashboardService.getUsersList().subscribe(data => {
      this.usersList = data;
      this.filterFriendsList(data);
    });
  }

  /**
   * @memberof DashBoardComponent
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
    this.usersList = tempUserList;
  }

  /**
   * @memberof DashBoardComponent
   * used for storing getting friends list from API
   */
  getFriendsList(){
    const currentUser = JSON.parse(this.getLoggedInUser());
    for(var i=0; i<currentUser['friends'].length; i++ ){
      this.friendsList.push(currentUser['friends'][i]['username'])
    }
    console.log('friend list is ' + this.friendsList)
  }

  /**
   * @memberof DashBoardComponent
   * used for storing getting posts of friends to show in Dashboard
   */
  getFriendsPosts(){
    for (var friend of this.friendsList){
      this.dashboardService.friendName = friend
      this.dashboardService.getFriendsPost().subscribe(data => {
        console.log(data)
        this.generalFeedPosts = data;
      })
    }
  }

  /**
   * @memberof DashBoardComponent
   * used to route to postHeadingTitle Component
   * shows a post in detail
   */
  gotToDetailedPost(eachPost: any) {
    this.router.navigate(['postHeadingTitle', eachPost._id]);
  }

  /**
   * @memberof DashBoardComponent
   * used to send friend request to a user
   */
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

  /**
   * @memberof DashBoardComponent
   * used to get saved posts of a user with ids
   */
  getSavedPostsId(){
    const currentUser = JSON.parse(this.getLoggedInUser());
    for (var i=0; i<currentUser.savedPosts.length; i++){
      this.savedPostsId.push(currentUser.savedPosts[i]['_id'])
    }
  }

  /**
   * @memberof DashBoardComponent
   * used to get saved posts contents of a user
   */
  getSavedPostsContent(){
    for (var postid of this.savedPostsId){
      this.dashboardService.postId = postid
      this.dashboardService.getSavedPosts().subscribe(data => {
        console.log(data)
        this.readingList.push(data)
      })
    }
  }

  /**
   * @memberof DashBoardComponent
   * used to get current logged in user from local storage
   */
  getLoggedInUser(): any {
    return JSON.parse(JSON.stringify(localStorage.getItem('currentUser')));
  }

  /**
   * @memberof DashBoardComponent
   * used to get top trending posts
   */
  getTopTrendingPosts(): void {
    this.dashboardService.getTopTrendingPosts().subscribe(data => {
      this.topTrendingPosts = data;
    })
  }
}
