import { Component, OnInit } from '@angular/core';
import { PostHeadingService } from './post-heading.service';
import { ActivatedRoute} from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
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

  // reportedPosts: any = [];

  postId = '';
  userId = '';
  commentsList: any = [];

  inspirerList: any = [];
  postNotifier: any;
  owner = '';

    constructor(
      private postHeadingService: PostHeadingService,
      private routeParams: ActivatedRoute,
      private spinner: NgxSpinnerService,
      private snackBar: MatSnackBar,
      private router: Router
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
      this.inspirerList = [];
      this.getInspirerHistory();
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
          this.comment = '';
          setTimeout(() => {
            this.spinner.hide();
          }, 1000);
        }
      });
      this.updateCommentList(commentRequestData);
    }

  savePost(event: any) {
    const currentUser = JSON.parse(this.getLoggedInUser());
    const savePostRequestPayLoad = {
      user: currentUser.username,
      postId: this.postId,
      notifier: this.postNotifier,
      owner: this.post.owner
    };
    this.postHeadingService.savePost(this.postId, savePostRequestPayLoad).subscribe(data => {
      if(data) {
        this.snackBar.open("Saved Post Successfully", void 0, {
          duration: 3000,
          horizontalPosition: 'center',
        });
      }
    });
    let postToSave = {title: this.post.title, id: this.postId};
    this.savedPosts.push(postToSave);
    console.log(this.savedPosts);

    this.postHeadingService.savePostForGraph(this.postId, savePostRequestPayLoad).subscribe(data => {
    });
  }

  reportPost(event: any){
    // let postToReport = {id: this.postId};
    // this.reportedPosts.push(postToReport);
    this.postHeadingService.reportPost(this.postId).subscribe(data => {
      const postAfterReport = data
      if(data) {
        this.snackBar.open("Post has been reported", void 0, {
          duration: 3000,
          horizontalPosition: 'center',
        });
      }
      const timesReported = postAfterReport.post.timesReported
      if (timesReported >= 10){
        this.postHeadingService.delete(this.postId).subscribe(data => {
          if(data) {
            this.snackBar.open("Post has been reported too many times. Post has been deleted for violating terms and conditions", void 0, {
              duration: 3000,
              horizontalPosition: 'center',
            });
            this.router.navigate(['/myposts'])
          }
        })
      }
    })


    // console.log(this.reportedPosts);
  }

  getLoggedInUser(): any {
    return JSON.parse(JSON.stringify(localStorage.getItem('currentUser')));
  }

  updateCommentList(commentData: { username: any; comment: string; }): void {
    this.commentsList.push(commentData);
  }

  getInspirerHistory(): void {
    const user = JSON.parse(this.getLoggedInUser());
    console.log(user);
    console.log("post data", this.post);
    const inspirerHistoryPayLoad = {
      'user': user.username,
      'postId': this.postId
    }
    this.postHeadingService.getInspirerHistory(inspirerHistoryPayLoad).subscribe( (data: any) => {
      this.inspirerList = data;
    })
  }

}
