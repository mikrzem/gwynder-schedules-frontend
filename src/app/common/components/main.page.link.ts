import {Component} from '@angular/core';

@Component({
    selector: 'main-page-link',
    template: `
        <a class="btn btn-info btn-padded"
           [routerLink]="[\'/main\']">
            <span class="fa fa-level-up"></span> Return
        </a>
    `
})
export class MainPageLink {

}
