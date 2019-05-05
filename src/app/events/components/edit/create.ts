import {Component} from '@angular/core';
import * as moment from 'moment';
import {ScheduledEventHeader} from '../../services/data';

@Component({
    selector: 'event-create',
    templateUrl: 'create.html'
})
export class EventCreate {

    public newEvent: ScheduledEventHeader = {
        title: null,
        start: moment().startOf('hour').format(),
        end: moment().startOf('hour').add(1, 'hour').format()
    }

}
