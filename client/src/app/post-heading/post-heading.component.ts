import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PostidService } from '../commonservices/postid.service';
import { LogInService } from '../login/login.service';
import { Router } from '@angular/router';
import { SavepostService } from '../commonservices/savepost.service';

@Component({
  selector: 'app-post-heading',
  templateUrl: './post-heading.component.html',
  styleUrls: ['./post-heading.component.scss']
})
export class PostHeadingComponent implements OnInit {
  username = ''
  public post : any={
    title : '',
    description: '',
    comments : [],
    imageurl : ''
  }
  public comment = ''
  // savedPosts: any = []
  reportedPosts: any = []
  constructor(

    private postId: PostidService,
    private http: HttpClient,
    private loginservice: LogInService,
    private router: Router,
    private savepostservice : SavepostService,
  ) { }

  ngOnInit(): void {

    console.log(this.postId.postId)
    this.http.get('http://localhost:3000/post/posts/' + this.postId.postId).subscribe((data) => {
      if(data){
        console.log(Object.values(data))
        this.post.title = Object.values(data)[4]
        this.post.description = Object.values(data)[5]
        this.post.comments = Object.values(data)[1]
        this.username = Object.values(data)[3]
        if(Object.values(data).length === 10){
          this.post.imageurl = Object.values(data)[6]
        }
        console.log(this.post)

      } else {
        console.log('No post to display')
        this.post = []
      }
    })
  }
  addComment(event: any){
    // this.username = this.loginservice.username
    if(this.comment.length > 0){
      this.http.patch('http://localhost:3000/post/addComment/'+this.postId.postId,{
      // username : this.username,
      comment : this.comment,
    }).subscribe((data) => {
      if(data){
        console.log(data)
        this.router.navigate(['/postHeadingTitle'])
      } else {
        console.log('oops')
      }
    })
    }
  }

  savePost(event: any){
    console.log(this.postId.postId)
    this.savepostservice.postId = this.postId.postId
    this.savepostservice.username = this.username
    this.savepostservice.savePost()
  }

  reportPost(event: any){
    var postToReport = {"id": this.postId.postId}
    this.reportedPosts.push(postToReport)
    console.log(this.reportedPosts)
  }
}
