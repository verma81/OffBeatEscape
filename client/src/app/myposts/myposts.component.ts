import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from '../addpost/addpost.model';
import { PostidService } from '../commonservices/postid.service';


@Component({
  selector: 'app-myposts',
  templateUrl: './myposts.component.html',
  styleUrls: ['./myposts.component.scss']
})
export class MypostsComponent implements OnInit {
  public posts : any = [];
  constructor(
    private http: HttpClient,
    private router: Router,
    private postId : PostidService
  ) { }

  ngOnInit(): void {

    // this.router.routeReuseStrategy.shouldReuseRoute = () => {
    //   return false;
    // }

    this.http.get('http://localhost:3000/post/getAllPosts').subscribe((data) => {
      if(data){
        this.posts = Object.values(data)
        console.log(this.posts)
      } else {
        this.posts = []
      }
    })
  }

  deletePost(event: any, _id: any) {
    this.updatePostsArray(this.posts);
    console.log(this.posts);
    this.http.delete("http://localhost:3000/post/posts/" + _id).subscribe((data) => {
      if(data){
        console.log(data)
        this.router.navigate(['/myposts'])
      } else {
        console.log("OOPS")
      }
    })
  }

  editPost(event: any, _id: any){
    console.log(_id)
    this.postId.postId = _id
    this.router.navigate(['/editpost'])
  }

  showPost(event: any, _id: any){
    console.log(_id)
    this.postId.postId = _id
    this.router.navigate(['/postHeadingTitle'])
  }

  updatePostsArray(allPosts: any): void {
    let postToDeleteIndex;
    for(let i = 0 ; i < allPosts.length; i++) {
      postToDeleteIndex = allPosts.findIndex((post: { _id: any; }) => {
        post._id = allPosts[i]._id
      });
    }
    allPosts.splice(postToDeleteIndex, 1);
  }

}
