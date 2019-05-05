import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import * as moment from 'moment';
import {BaseDataService} from '../../common/services/service';
import {UrlService} from '../../common/services/url';
import {ScheduledEventHeader} from './data';

@Injectable()
export class ScheduledEventService extends BaseDataService<ScheduledEventHeader> {

    constructor(
        client: HttpClient,
        url: UrlService
    ) {
        super(client, url, 'events');
    }

    public select(from: string, to: string): Promise<ScheduledEventHeader[]> {
        const fromDateTime = encodeURIComponent(moment(from).startOf('day').format());
        const toDateTime = encodeURIComponent(moment(to).endOf('day').format());
        const params = new HttpParams()
            .set('from', fromDateTime)
            .set('to', toDateTime);
        return this.client.get<ScheduledEventHeader[]>(
            this.url(),
            {params: params}
        ).toPromise();
    }

}
