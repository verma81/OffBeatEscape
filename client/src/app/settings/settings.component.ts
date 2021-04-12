import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

class ImageSnippet {
  constructor(public src: string, public file: File) { }
}

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }

  /**
   * @memberof SettingsComponent
   * used for storing username and diplaying it in UI
   */
  user: any;
  // @ts-ignore
  selectedFile: ImageSnippet;

  ngOnInit(): void {
    this.getLoggedInUser();
  }

  /**
   * @memberof SettingsComponent
   * used for getting logged in user
   */
  getLoggedInUser(): any {
    this.user = (JSON.parse(JSON.parse(JSON.stringify(localStorage.getItem('currentUser')))));
  }

  /**
   * @memberof SettingsComponent
   * used for uploading file
   */
  uploadFile(imageInput: any) {
    const file: File = imageInput.files[0];
    console.log(file);
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {
      this.selectedFile = new ImageSnippet(event.target.result, file);
    });

    reader.readAsDataURL(file);
  }

  /**
   * @memberof SettingsComponent
   * used for adding profile image
   */
  addProfileImage() {
    const formData = new FormData();
    formData.append('profileImage', this.selectedFile.file);
    return this.http
      .patch('http://localhost:3000/users/addProfileImage/' + this.user.username, formData)
      .subscribe(
        (res) => {
          console.log(res);
        },
        (err) => {
          console.log(err);
        }
      );
  }

}
