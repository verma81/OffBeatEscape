import { Component, OnInit } from '@angular/core';

class ImageSnippet {
  constructor(public src: string, public file: File) {}
}

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  constructor() { }
  user: any;
  // @ts-ignore
  selectedFile: ImageSnippet;

  ngOnInit(): void {
    this.getLoggedInUser();
  }
  
  getLoggedInUser(): any {
    this.user = (JSON.parse(JSON.parse(JSON.stringify(localStorage.getItem('currentUser')))));
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

  addProfileImage() {

  }
  
}
