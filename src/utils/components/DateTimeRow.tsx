import moment from 'moment';
import React, {ChangeEvent, Component, ReactNode} from 'react';

export interface DateTimeRowProps {

    title: string;
    value: moment.Moment | null;
    onChange?: (next: moment.Moment) => void

}

export class DateTimeRow extends Component<DateTimeRowProps, any> {

    public dateChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.value) {
            let nextDate = moment(event.target.value);
            if (this.props.value) {
                nextDate = nextDate
                    .hour(this.props.value.hour())
                    .minute(this.props.value.minute());
            }
            this.changeDate(nextDate);
        }
    };

    public hourChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.value) {
            const hour = parseInt(event.target.value);
            if (this.props.value) {
                const nextDate = moment(this.props.value).hour(hour);
                this.changeDate(nextDate);
            }
        }
    };

    public minuteChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.value) {
            const minute = parseInt(event.target.value);
            if (this.props.value) {
                const nextDate = moment(this.props.value).minute(minute);
                this.changeDate(nextDate);
            }
        }
    };

    get date() {
        if (this.props.value) {
            return this.props.value.format('YYYY-MM-DD');
        } else {
            return '';
        }
    }

    get hour() {
        if (this.props.value) {
            return this.props.value.hour();
        } else {
            return 0;
        }
    }

    get minute() {
        if (this.props.value) {
            return this.props.value.minute();
        } else {
            return 0;
        }
    }

    public render(): ReactNode {
        return (
            <div className="row form-group">
                <label className="col-md-4">
                    {this.props.title}
                </label>
                <div className="col-md-4">
                    <input type="date"
                           className="form-control"
                           value={this.date}
                           onChange={this.dateChange}/>
                </div>
                <div className="col-md-4">
                    <div className="input-group">
                        <input type="number"
                               min="0"
                               max="23"
                               step="1"
                               className="form-control"
                               value={this.hour}
                               onChange={this.hourChange}/>
                        <div className="input-group-addon">
                            <span className="input-group-text">
                                :
                            </span>
                        </div>
                        <input type="number"
                               min="0"
                               max="59"
                               step="1"
                               className="form-control"
                               value={this.minute}
                               onChange={this.minuteChange}/>
                    </div>
                </div>
            </div>
        );
    }

    private changeDate(next: moment.Moment) {
        if (this.props.onChange) {
            this.props.onChange(next);
        }
    }

}