import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Post} from './addpost.model';

class ImageSnippet{
  constructor(public src: string, public file: File) {}
}

@Injectable({
  providedIn: 'root',
})
export class AddPostService {
  // @ts-ignore
  selectedFile : ImageSnippet;

    constructor(private http: HttpClient){

	}

  // addPost(post: Post){
  //   const formData = new FormData()
  //   console.log(post.description)
  //   formData.append('description', post.description)
  //   formData.append('title', post.title)
  //   return this.http.post('http://localhost:3000/post/addPost',{
  //     title : post.title,
  //     description : post.description,
  //   })
  // }

    addPost(post: Post){
    const formData = new FormData();
    console.log(this.selectedFile);
    formData.append('description', post.description);
    formData.append('title', post.title);
    return this.http.post('http://localhost:3000/post/addPost', formData);
  }

}
