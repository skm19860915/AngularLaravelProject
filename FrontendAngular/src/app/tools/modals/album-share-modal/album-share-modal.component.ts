import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppSettings } from '../../../shared/appSettings';
@Component({
  selector: 'app-album-share-modal',
  templateUrl: './album-share-modal.component.html',
  styleUrls: ['./album-share-modal.component.css']
})
export class AlbumShareModalComponent implements OnInit {
  
  albumLink = "";
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    
    let current_path = localStorage.getItem("current_path");
    if(current_path == "home") current_path = localStorage.getItem("current_category");
    this.albumLink = AppSettings.frontendURL + "/album?path=" + localStorage.getItem("unique_id") + "/" + current_path;
   }

  ngOnInit(): void {
  }
  copyText(val: string) {
    let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }
}
