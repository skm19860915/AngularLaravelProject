import { Injectable } from '@angular/core';
import { Event, NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { NavItem } from '../interfaces/nav-item';

@Injectable()
export class NavService {

    public appDrawer: any;
    public currentUrl = new BehaviorSubject<string>(undefined);
    private folderTreeSource = new BehaviorSubject<NavItem>(undefined);
    folderTree = this.folderTreeSource.asObservable();

    constructor(private router: Router) {
        this.router.events.subscribe((event: Event) => {
            if (event instanceof NavigationEnd) {
                let tmpList = ["/account", "/folder-creation", "/upgrade-account", "/submit-success", "/uploading"]; // this is used to check it the sidebar should be changed.
                if(!tmpList.includes(event.urlAfterRedirects)) {
                    this.currentUrl.next(event.urlAfterRedirects);
                }
                else if(event.urlAfterRedirects == "/uploading" || event.urlAfterRedirects == "/folder-creation"){
                    this.currentUrl.next("/" + localStorage.getItem("current_category") + "/" + encodeURIComponent(localStorage.getItem("current_path")));
                }
            }
        });
    }

    public closeNav() {
        if (this.appDrawer) {
            //this.appDrawer.close();
            let el = this.appDrawer.nativeElement;
            el.setAttribute('style', 'width: 0px');
        }
    }

    public openNav() {
        if (this.appDrawer) {
            //this.appDrawer.open();
            let el = this.appDrawer.nativeElement;
            el.setAttribute('style', 'width: 250px');
        }
    }
    changeFolderTree(tree: NavItem) {
        this.folderTreeSource.next(tree);
    }
}
