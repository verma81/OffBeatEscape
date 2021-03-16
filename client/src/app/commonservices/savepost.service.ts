import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SavepostService {
postId :string =  ""
username: string = ''
  constructor(private http: HttpClient) {  }
  // savePost(){
  //   console.log(this.postId)
  //   console.log(this.username)
  //   this.http.patch('http://localhost:3000/post/savepost/'+ this.postId,{
  //     username: this.username
  //   }).subscribe((data) => {
  //     if(data){
  //       console.log(data)
  //     } else {
  //       console.log('oops')
  //     }
  //   })
  // }

  savePost(){
    console.log(this.postId)
    console.log(this.username)
    this.http.patch('http://localhost:3000/users/savePost/'+ this.username,{
      postId: this.postId,
      username: this.username
    }).subscribe((data) => {
      if(data){
        console.log(data)
      } else {
        console.log('error')
      }
    })
  }
}
