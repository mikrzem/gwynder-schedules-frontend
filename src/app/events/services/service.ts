import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
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
        const params = new HttpParams()
            .set('from', from)
            .set('to', to);
        return this.client.get<ScheduledEventHeader[]>(
            this.url(),
            {params: params}
        ).toPromise();
    }

}
