import {Component, Input} from '@angular/core';
import {Router} from '@angular/router';
import {ScheduledEventHeader} from '../../services/data';
import {ScheduledEventService} from '../../services/service';

@Component({
    selector: 'event-edit',
    templateUrl: 'edit.html'
})
export class EventEdit {

    @Input()
    public event: ScheduledEventHeader;

    public error: boolean = false;

    constructor(
        private readonly service: ScheduledEventService,
        private readonly router: Router
    ) { }

    public async save() {
        try {
            if (this.event) {
                const saved = await this.service.save(this.event);
                await this.router.navigate(['/event', 'update', saved.id], {queryParams: {saved: true}})
            }
        } catch (e) {
            console.error(e);
            this.error = true
        }
    }

}
