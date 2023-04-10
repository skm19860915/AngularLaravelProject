import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FileviewService } from '../../shared/fileview.service';
import { CardItem } from '../interfaces/CardItem';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css'],
})
export class AlbumComponent implements OnInit {
  
    currentPath = "";
    cardItems: CardItem[];
    selection_list = new SelectionModel<CardItem>(true, []);
    public protected: number;
    public wrongPassword: boolean = false;
    public passwordInput: string;
    album_title: string;
    album_pasword: string = "";

    constructor(
        private route: ActivatedRoute,
        private fileviewService: FileviewService,
        ) {
        this.route.queryParams.subscribe((params) => {
            this.currentPath = "uploads/" + params['path'] + "/";
            this.getItems();
            localStorage.setItem("current_category", "album-sharing");
        });
        
    }
    getItems() {
        let requestPayload = {
            currentPath: this.currentPath,
        };
        this.fileviewService.getFileByCategoryByPath(requestPayload).subscribe(
        result => {
            if(result['albumProperty'].length) {
                this.cardItems = result['fileList'];
                this.protected = result['albumProperty'][0]['is_protected'];
                if (result['albumProperty'][0]['user_id'] == localStorage.getItem('user_id')) this.protected = 0;
                this.album_title = result['albumProperty'][0]['title'];
                this.album_pasword = result['albumProperty'][0]['password'];
            }
        },
        error => {
    
        }, () => {
            //
    
        }
        );
    }
    deleteItems(deletedItems: CardItem[]) {
        
    }
    confirmPassword() {
        if (this.album_pasword != this.passwordInput) this.wrongPassword = true;
        else this.protected = 0;
    }
    ngOnInit(): void {}
}
