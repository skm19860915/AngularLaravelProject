import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CardItem } from '../../../components/interfaces/CardItem';
import { FileviewService } from '../../../shared/fileview.service';

@Component({
  selector: 'app-privacy-modal',
  templateUrl: './privacy-modal.component.html',
  styleUrls: ['./privacy-modal.component.css']
})

export class PrivacyModalComponent {
  privacy_select = "";
  password = "";
  constructor(
    // @Inject(MAT_DIALOG_DATA) public data: CardItem,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fileviewService: FileviewService,
    private dialogRef: MatDialogRef<PrivacyModalComponent>
  ) { 
    this.privacy_select = data.data.is_protected.toString();
  }
  onPrivacyConfirm() {
    let item = this.data.data;
    if(item['is_protected'].toString() == this.privacy_select && this.privacy_select != "2") return;
    if(this.privacy_select != '2') this.password = "";
    let path = item['unique_id'];
    let pathArray = [];
    pathArray = path.split("/");
    if(pathArray[pathArray.length - 1] == "home") {
        pathArray[pathArray.length - 1] = localStorage.getItem("current_category");
        // path = path.replace("home", localStorage.getItem("current_category"));
    }
    path = pathArray.join("/");
    let requestPayload = {
      unique_id: path,
      is_protected: Number(this.privacy_select), 
      password: this.password
    };
    if (this.data.type == 'folder'){
      this.fileviewService.editFolderPrivacy(requestPayload).subscribe(
        result => {
            this.dialogRef.close(this.privacy_select);
        },
        error => {
  
        }, () => {
          //          
        }
      );
    }else{
      this.fileviewService.editFilePrivacy(requestPayload).subscribe(
        result => {
            this.dialogRef.close(this.privacy_select);
        },
        error => {
  
        }, () => {
          //          
        }
      );
    }    
  }
}
