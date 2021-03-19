import { Component, OnInit } from '@angular/core';
import { PostidService } from '../commonservices/postid.service';
import { HttpClient } from '@angular/common/http';
import { Edit } from './editpost.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editpost',
  templateUrl: './editpost.component.html',
  styleUrls: ['./editpost.component.scss']
})
export class EditpostComponent implements OnInit {
    //@ts-ignore
  public edit : Edit = ""
  public post : any={
    title : '',
    description: ''
  }

  constructor(

    private postId: PostidService,
    private http: HttpClient,
    private router: Router,
  ) {
    this.edit = new Edit() //instance of model
  }

  ngOnInit(): void {
    console.log(this.postId.postId)
    this.http.get('http://localhost:3000/post/posts/' + this.postId.postId).subscribe((data) => {
      if(data){
        console.log(Object.values(data))
        this.post.title = Object.values(data)[4]
        this.post.description = Object.values(data)[5]
        console.log(this.post)
      } else {
        console.log('No post to display')
        this.post = []
      }
    })
  }

  editPost(event: any){
    console.log(this.post.title)
    console.log(this.post.description)
    this.edit.id = this.postId.postId
    // this.editPostService.editSinglePost(this.edit).subscribe((res:any) => {
    //   console.log(res)
    // })
    this.http.patch('http://localhost:3000/post/posts/'+this.edit.id,{
      title : this.post.title,
      description : this.post.description,
    }).subscribe((data) => {
      if(data){
        console.log(data)
        this.router.navigate(['/myposts'])
      } else {
        console.log('No post to display')
      }
    })
  }

}
