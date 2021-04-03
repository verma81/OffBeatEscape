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
  
  notificationsList: any = [];

  ngOnInit(): void {
    const currentUser = JSON.parse(this.getLoggedInUser());
    this.notificationsList = currentUser.notifications;
    console.log(this.notificationsList);
  }

  logoutFromApplication(): void {
    this.headerService.logOutUser().subscribe(data => {});
    localStorage.removeItem("authenticated_user");
    this.router.navigate(['/login']);
  }

  goToAddPost(): void {
    this.router.navigate(['/addpost']);
  }

  goToMyPosts(): void {
    this.router.navigate(['/myposts'])
  }

  goToSettings(): void {
    this.router.navigate(['/settings'])
  }

  goToPost(postId: any): void {
    this.router.navigate(['/postHeadingTitle', postId])
  }

  routeToDashboard(): void {
    this.router.navigate(['/dashboard'])
  }

  getLoggedInUser(): any {
    return JSON.parse(JSON.stringify(localStorage.getItem('currentUser')));
  }

  acceptFriendRequest(notification: any): void {
    const acceptFriendRequestPayLoad = {
      '_id': notification.friendUserId
    }
    this.headerService.acceptFriendRequest(notification.currentUserId, acceptFriendRequestPayLoad).subscribe(data => {

    });
    this.updateNotificationsList(this.notificationsList, notification);
  }

  updateNotificationsList(notificationsList: any, notification: any): void {
    const notificationToDeleteIndex = notificationsList.findIndex((notification: any) => {
      return notificationsList.friendUserId === notification.friendUserId
    });
    notificationsList.splice(notificationToDeleteIndex, 1);
  }

}
