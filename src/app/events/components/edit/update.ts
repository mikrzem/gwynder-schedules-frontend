import {Component} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {RoutedComponent} from '../../../common/components/routed';
import {ScheduledEventHeader} from '../../services/data';
import {ScheduledEventService} from '../../services/service';

@Component({
    selector: 'event-update',
    templateUrl: 'update.html'
})
export class EventUpdate extends RoutedComponent {

    public request: Promise<ScheduledEventHeader>;

    public saved: boolean = false;

    constructor(
        private readonly service: ScheduledEventService,
        route: ActivatedRoute
    ) {
        super(route);
    }

    protected onParam(params: Params) {
        const id = parseInt(params['id']);
        this.request = this.service.get(id);
    }

    protected onQuery(params: Params) {
        this.saved = params['saved'] == 'true';
    }
}
