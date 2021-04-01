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
      } else {
        this.posts = []
      }
    })
  }

  deletePost(event: any, currentPostId: string) {
    this.updatePostsArray(currentPostId.toString(), this.posts);
    this.http.delete("http://localhost:3000/post/posts/" + currentPostId).subscribe((data) => {
      if(data){
        this.router.navigate(['/myposts'])
      } else {
        console.log("OOPS")
      }
    })
  }

  editPost(event: any, _id: any){
    this.router.navigate(['/editpost', _id])
  }

  showPost(event: any, _id: any){
    const loggedInUser = JSON.parse(this.getLoggedInUser());
    this.router.navigate(['/postHeadingTitle', _id]);
  }

  updatePostsArray(currentPostId: string, allPosts: any): void {
    console.log(currentPostId.toString());
    console.log(allPosts);
    const postToDeleteIndex = allPosts.findIndex((post: { _id: string; }) => {
        return currentPostId === post._id 
    })
    console.log(postToDeleteIndex);
    allPosts.splice(postToDeleteIndex, 1);
  }

  getLoggedInUser(): any {
    return JSON.parse(JSON.stringify(localStorage.getItem('currentUser')));
  }

}
