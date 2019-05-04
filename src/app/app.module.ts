import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CalendarModule, DropdownModule} from 'primeng/primeng';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {DateSelect} from './common/components/date.select';
import {DateTimeDisplay} from './common/components/datetime.display';
import {DateTimeSelect} from './common/components/datetime.select';
import {UrlService} from './common/services/url';
import {ScheduledEventService} from './events/services/service';
import {Error404Page} from './main/error.404';
import {StartPage} from './main/start.page';

@NgModule({
    declarations: [
        AppComponent,
        Error404Page,
        StartPage,
        DateSelect,
        DateTimeSelect,
        DateTimeDisplay,
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
        ScheduledEventService,
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
