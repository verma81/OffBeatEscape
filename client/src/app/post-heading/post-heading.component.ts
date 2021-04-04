import { Component, OnInit } from '@angular/core';
import { PostHeadingService } from './post-heading.service';
import { ActivatedRoute} from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-post-heading',
  templateUrl: './post-heading.component.html',
  styleUrls: ['./post-heading.component.scss']
})
export class PostHeadingComponent implements OnInit {

  username = '';

  post: any = [];

  comment = '';

  savedPosts: any = [];

  reportedPosts: any = [];

  postId = '';
  userId = '';
  commentsList: any = [];

  inspirerList: any = [];
  postNotifier: any;

    constructor(
      private postHeadingService: PostHeadingService,
      private routeParams: ActivatedRoute,
      private spinner: NgxSpinnerService
    ) { }

    ngOnInit(): void {
      this.routeParams.params.forEach( (routeParam) => {
        this.postId = routeParam.pid;
        this.postNotifier = routeParam.notifier;
      });
      this.postHeadingService.getPostDetails(this.postId).subscribe(data => {
        if (data) {
          this.post = data;
          this.commentsList = data.comments;
          this.spinner.show();
          setTimeout(() => {
            this.spinner.hide();
          }, 1000);
        }
      });

      this.inspirerList = [
        {
          imageUrl: '../../assets/user.png',
          inspirerName: 'User1'
        },
        {
          imageUrl: '../../assets/user.png',
          inspirerName: 'User2'
        },
        {
          imageUrl: '../../assets/user.png',
          inspirerName: 'User3'
        }
      ]
    }

    addComment(event: any) {
      const currentUser = JSON.parse(this.getLoggedInUser());
      const commentRequestData = {
        username: currentUser.username,
        comment: this.comment
      };
      this.postHeadingService.addCommentOnAPost(commentRequestData, this.postId).subscribe(data => {
        if (data) {
          this.spinner.show();
          setTimeout(() => {
            this.spinner.hide();
          }, 1000);
        }
      });
      this.updateCommentList(commentRequestData);
    }

  savePost(event: any) {
    const currentUser = JSON.parse(this.getLoggedInUser());
    console.log(currentUser);
    const savePostRequestPayLoad = {
      user: currentUser.username,
      postId: this.postId,
      notifier: this.postNotifier
    };
    this.postHeadingService.savePost(this.postId, savePostRequestPayLoad).subscribe(data => {

    });
    let postToSave = {title: this.post.title, id: this.postId};
    this.savedPosts.push(postToSave);
    console.log(this.savedPosts);
  }

  reportPost(event: any){
    let postToReport = {id: this.postId};
    this.reportedPosts.push(postToReport);
    console.log(this.reportedPosts);
  }

  getLoggedInUser(): any {
    return JSON.parse(JSON.stringify(localStorage.getItem('currentUser')));
  }

  updateCommentList(commentData: { username: any; comment: string; }): void {
    this.commentsList.push(commentData);
  }

}
