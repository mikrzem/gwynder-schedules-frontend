import {Component, Input} from '@angular/core';
import * as moment from 'moment';

@Component({
    selector: 'datetime-display',
    template: '{{display}}'
})
export class DateTimeDisplay {

    public display: string = ''

    @Input()
    set value(value: string) {
        if (value) {
            this.display = moment(value).format('YYYY-MM-DD HH:mm')
        } else {
            this.display = ''
        }
    }

}
