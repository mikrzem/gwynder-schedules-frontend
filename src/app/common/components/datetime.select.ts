import {Component, EventEmitter, Input, Output} from '@angular/core';
import * as moment from 'moment';

@Component({
    selector: 'datetime-select',
    template: '<p-calendar [(ngModel)]="current" showTime="true" hourFormat="24"></p-calendar>'
})
export class DateTimeSelect {

    @Output() public valueChange = new EventEmitter<string>();

    private _current: Date = new Date();

    get current(): Date {
        return this._current;
    }

    set current(date: Date) {
        this._current = date;
        if (date) {
            this.valueChange.emit(
                moment(date).format()
            );
        } else {
            this.valueChange.emit(null);
        }
    }

    @Input() set value(value: string) {
        this._current = moment(value).toDate();
    }

}
