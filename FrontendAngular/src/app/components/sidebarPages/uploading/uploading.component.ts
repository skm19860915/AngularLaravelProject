import { Component, ViewChild, OnInit } from '@angular/core';
import { FlowDirective, Transfer } from '@flowjs/ngx-flow';
import { Subscription } from 'rxjs';
import { Globals } from '../../../global';
import { AppSettings } from '../../../shared/appSettings';
import { SidebarBroadcastService } from '../../../shared/sidebar-broadcast.service';
import { MatDialog } from '@angular/material/dialog';
import { AlertComponent } from 'src/app/shared/alert/alert.component';

@Component({
  selector: 'app-uploading',
  templateUrl: './uploading.component.html',
  styleUrls: ['./uploading.component.css']
})
export class UploadingComponent implements OnInit {
  currentPath = "home";
  currentAblum;
  public currentCategory;
  public allowedExtensions = {
    'Photo': '.png, .jpg, .gif, .tif, .webp',
    'Music': '.mp3, .wav, .wma',
    'Video': '.mp4, .mov, .swf, .flv',
    'Code': '.txt, .rtf, .html, .html5, .webm, .php, .css, .xml, .json, .pdf, .docx, .doc, .xls, .xlsx, .ppt, .pptx, .java, .rar, .zip'
  };
  backendURL;
  constructor(private globals: Globals, private broadcastService: SidebarBroadcastService, public dialog: MatDialog) {
    this.currentPath = localStorage.getItem("current_path");
    this.currentCategory = localStorage.getItem('current_category');
    this.backendURL = AppSettings.backendURL;
    let loc_array = this.currentPath.split("/");
    this.currentAblum = loc_array[loc_array.length - 1];
  }

  ngOnInit(): void {
  }

  @ViewChild('flowAdvanced')
  flow: FlowDirective;

  autoUploadSubscription: Subscription;
  public uploadFinished: boolean;
  autoupload = true;

  ngAfterViewInit() {
    this.flow.flowJs.opts.query = {
      user_id: localStorage.getItem('user_id'),
      unique_id: localStorage.getItem('unique_id'),
      currentPath: this.currentPath,
      currentCategory: this.currentCategory
    }

    this.autoUploadSubscription = this.flow.events$.subscribe(event => {

      this.flow.flowJs.files.forEach(item => {

        if(!this.allowedExtensions[this.currentCategory].includes(item.getExtension())){
          item.cancel();
        }
        if(item.size > 50 * 1024 * 1024){
          this.dialog.open(AlertComponent, {
            data: {
              message: "Sorry, but can't upload the file having more than 50 MB!",
              buttonText: {
                cancel: 'Close',
              },
            },
          });
          console.log('large file');
          item.cancel();
        }
      });
      if (this.autoupload && event.type === 'filesSubmitted') {
        this.uploadFinished = false;
        this.flow.upload();
      }
      if(event.type == "complete") {
        this.uploadFinished = true;
        this.broadcastService.boradcast("NAVITEMS_CHANGED");
      }
    });

  }

  ngOnDestroy() {
    this.autoUploadSubscription.unsubscribe();
  }

  trackTransfer(transfer: Transfer) {
    return transfer.id;
  }

}
