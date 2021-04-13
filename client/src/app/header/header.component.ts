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
  
  /**
   * @memberof HeaderComponent
   * used to get notifications list to display notifications
   */
  notificationsList: any = [];

  ngOnInit(): void {
    const currentUser = JSON.parse(this.getLoggedInUser());
    this.notificationsList = currentUser.notifications;
    console.log(this.notificationsList);
  }

  /**
   * @memberof HeaderComponent
   * used to logout the current user
   * removes current logged in user from local storage
   */
  logoutFromApplication(): void {
    this.headerService.logOutUser().subscribe(data => {});
    localStorage.removeItem("authenticated_user");
    this.router.navigate(['/login']);
  }

  /**
   * @memberof HeaderComponent
   * used to route the user to add post
   */
  goToAddPost(): void {
    this.router.navigate(['/addpost']);
  }

  /**
   * @memberof HeaderComponent
   * used to route the user to his/her posts
   */
  goToMyPosts(): void {
    this.router.navigate(['/myposts'])
  }

  /**
   * @memberof HeaderComponent
   * used to route the user to settings page
   */
  goToSettings(): void {
    this.router.navigate(['/settings'])
  }

  /**
   * @memberof HeaderComponent
   * used to route the user to postHeadingTitle component
   * shows the post in detail
   */
  goToPost(notification: any): void {
    this.router.navigate(['/postHeadingTitle', notification.postId, notification.notifier])
  }

  /**
   * @memberof HeaderComponent
   * used to route the user to dashboard from any other page
   */
  routeToDashboard(): void {
    this.router.navigate(['/dashboard'])
  }

  /**
   * @memberof HeaderComponent
   * gets current logged in user from local storage
   */
  getLoggedInUser(): any {
    return JSON.parse(JSON.stringify(localStorage.getItem('currentUser')));
  }

  /**
   * @memberof HeaderComponent
   * accept friend request of another user
   */
  acceptFriendRequest(notification: any): void {
    const acceptFriendRequestPayLoad = {
      '_id': notification.friendUserId
    }
    this.headerService.acceptFriendRequest(notification.currentUserId, acceptFriendRequestPayLoad).subscribe(data => {

    });
    this.updateNotificationsList(this.notificationsList, notification);
  }

  /**
   * @memberof HeaderComponent
   * used to update notification list in UI once user accepts or rejects a friend request
   */
  updateNotificationsList(notificationsList: any, notification: any): void {
    const notificationToDeleteIndex = notificationsList.findIndex((notification: any) => {
      return notificationsList.friendUserId === notification.friendUserId
    });
    notificationsList.splice(notificationToDeleteIndex, 1);
  }
}
