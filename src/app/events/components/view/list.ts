import {Component, OnInit} from '@angular/core';
import * as moment from 'moment';
import {ScheduledEventFilter, ScheduledEventHeader} from '../../services/data';
import {ScheduledEventService} from '../../services/service';

@Component({
    selector: 'events-list-view',
    templateUrl: 'list.html'
})
export class EventsListView implements OnInit {

    public filter: ScheduledEventFilter = {
        from: moment().format('YYYY-MM-DD'),
        to: moment().format('YYYY-MM-DD')
    };

    public request: Promise<ScheduledEventHeader[]>;

    constructor(
        private readonly service: ScheduledEventService
    ) { }

    public ngOnInit(): void {
        this.loadList()
    }

    public search() {
        this.loadList();
    }

    private loadList() {
        this.request = this.service.select(
            this.filter
        );
    }
}
