import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AddPostService } from './addpost.service';
import { Post } from './addpost.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

class ImageSnippet {
  constructor(public src: string, public file: File) {}
}

@Component({
  selector: 'app-addpost',
  templateUrl: './addpost.component.html',
  styleUrls: ['./addpost.component.scss'],
})
export class AddpostComponent implements OnInit {
  public post: Post;
  // @ts-ignore
  selectedFile: ImageSnippet;

  constructor(
    // private toastr: ToastrService,
    private router: Router,
    private addPostService: AddPostService,
    private http: HttpClient
  ) {
    this.post = new Post();
  }

  ngOnInit(): void {}

  addPost() {
    // if(this.post.title && this.post.description){
    //   this.addPostService.addPost(this.post).subscribe(res =>{
    //     console.log('response is ', res)
    //     this.router.navigate(['/myposts'])
    //     if(this.selectedFile){
    //       this.addImage(this.selectedFile.file).subscribe(
    //         (res) => {
    //           console.log(res)
    //         },
    //         (err) => {
    //           console.log(err)
    //         }
    //       )
    //     }
    // });
    // } else {
    //   alert('Title and Description required');
    // }
    if (this.post.title && this.post.description) {
      if(!this.selectedFile){
        const formData = new FormData();
        console.log(this.post.title);
        formData.append('description', this.post.description);
        formData.append('title', this.post.title);
        return this.http
        .post('http://localhost:3000/post/addPost', formData)
        .subscribe(
          (res) => {
            console.log(res);
            this.router.navigate(['/myposts'])
          },
          (err) => {
            console.log(err);
          }
        );

      } else{
        const formData = new FormData();
        console.log(this.post.title);
        formData.append('description', this.post.description);
        formData.append('title', this.post.title);
        formData.append('image', this.selectedFile.file);
        return this.http
        .post('http://localhost:3000/post/addPost', formData)
        .subscribe(
          (res) => {
            console.log(res);
            this.router.navigate(['/myposts'])
          },
          (err) => {
            console.log(err);
          }
        );
      }

    }else {
      return alert('Title and Description required');
     }
  }

  addImage(image: File) {
    const formData = new FormData();
    formData.append('image', image);
    return this.http.post('http://localhost:3000/post/addImage', formData);
  }

  uploadFile(imageInput: any) {
    const file: File = imageInput.files[0];
    console.log(file);
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {
      this.selectedFile = new ImageSnippet(event.target.result, file);
    });

    reader.readAsDataURL(file);
  }
}
