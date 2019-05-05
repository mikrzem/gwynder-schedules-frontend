import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import * as moment from 'moment';
import {BaseDataService} from '../../common/services/service';
import {UrlService} from '../../common/services/url';
import {ScheduledEventFilter, ScheduledEventHeader} from './data';

@Injectable()
export class ScheduledEventService extends BaseDataService<ScheduledEventHeader> {

    constructor(
        client: HttpClient,
        url: UrlService
    ) {
        super(client, url, 'events');
    }

    public select(filter: ScheduledEventFilter): Promise<ScheduledEventHeader[]> {
        const validFilter: ScheduledEventFilter = {
            from: moment(filter.from || moment().format()).startOf('day').format(),
            to: moment(filter.to || moment().format()).endOf('day').format()
        };
        const filterEncoded = btoa(JSON.stringify(validFilter));
        const params = new HttpParams()
            .set('filter', filterEncoded);
        return this.client.get<ScheduledEventHeader[]>(
            this.url(),
            {params: params}
        ).toPromise();
    }

}
