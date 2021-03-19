import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Edit } from './editpost.model';
import { Router } from '@angular/router';
import { ActivatedRoute} from '@angular/router';
import { EditPostService } from './editpost.service';

@Component({
  selector: 'app-editpost',
  templateUrl: './editpost.component.html',
  styleUrls: ['./editpost.component.scss']
})
export class EditpostComponent implements OnInit {
  //@ts-ignore

  public edit : Edit = ""

  public post : any = {
    title : '',
    description: ''
  }

  postId: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private routeParams: ActivatedRoute,
    private editPostService: EditPostService
  ) {
    this.edit = new Edit() //instance of model
  }

  ngOnInit(): void {
    this.routeParams.params.forEach( (routeParam) => {
      this.postId = routeParam.pid;
    })
    console.log(this.postId);
    this.editPostService.getPost(this.postId).subscribe((data: { [s: string]: unknown; } | ArrayLike<unknown>) => {
      if(data){
        console.log(Object.values(data))
        this.post.title = Object.values(data)[4]
        this.post.description = Object.values(data)[5]
        console.log(this.post)
      } else {
        console.log('No post to display')
        this.post = []
      }
    });
  }

  editPost(event: any) {
    const postData = this.post;

    const editPostPayLoad = {
      'title': postData.title,
      'description': postData.description
    }
    this.editPostService.editPost(this.postId, editPostPayLoad).subscribe(data => {
      if(data){
        console.log(data)
        this.router.navigate(['/myposts'])
      } else {
        console.log('No post to display')
      }
    });
  } 
}

