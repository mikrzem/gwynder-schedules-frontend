import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CalendarModule, DropdownModule} from 'primeng/primeng';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {DateSelect} from './common/components/date.select';
import {UrlService} from './common/services/url';
import {Error404Page} from './main/error.404';
import {StartPage} from './main/start.page';

@NgModule({
    declarations: [
        AppComponent,
        Error404Page,
        StartPage,
        DateSelect,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        DropdownModule,
        CalendarModule,
    ],
    providers: [
        UrlService,
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
