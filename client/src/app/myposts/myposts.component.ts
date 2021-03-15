import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-myposts',
  templateUrl: './myposts.component.html',
  styleUrls: ['./myposts.component.scss']
})
export class MypostsComponent implements OnInit {
  public posts : any = [];
  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.http.get('http://localhost:3000/post/getMyPosts').subscribe((data) => {
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
    this.router.navigate(['/editpost'])
  }

  showPost(event: any, _id: any){
    const loggedInUser = JSON.parse(this.getLoggedInUser());
    this.router.navigate(['/postHeadingTitle', loggedInUser._id, _id]);
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

  getLoggedInUser(): any {
    return JSON.parse(JSON.stringify(localStorage.getItem('currentUser')));
  }

}
