import {Component, EventEmitter, Input, Output} from '@angular/core';
import * as moment from 'moment';

@Component({
    selector: 'date-select',
    template: '<p-calendar [(ngModel)]="current"></p-calendar>'
})
export class DateSelect {

    @Output() public valueChange = new EventEmitter<string>();

    private _current: Date = new Date();

    get current(): Date {
        return this._current;
    }

    set current(date: Date) {
        this._current = date;
        if (date) {
            this.valueChange.emit(
                moment(date).format('YYYY-MM-DD')
            );
        } else {
            this.valueChange.emit(null);
        }
    }

    @Input() set value(value: string) {
        this._current = moment(value).toDate();
    }

}
