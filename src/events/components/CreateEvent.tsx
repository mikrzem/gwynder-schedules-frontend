import moment from 'moment';
import React, {ChangeEvent, Component, FormEvent} from 'react';
import {DateTimeRow} from '../../utils/components/DateTimeRow';
import {ScheduleEvent} from '../services/data';
import {eventService} from '../services/service';

interface CreateEventState {
    start: moment.Moment;
    end: moment.Moment;
    title: string;
}

export class CreateEvent extends Component<any, CreateEventState> {

    constructor(props: Readonly<any>) {
        super(props);
        this.state = this.freshState();

        this.save = this.save.bind(this);
        this.setStart = this.setStart.bind(this);
        this.setEnd = this.setEnd.bind(this);
        this.setTitle = this.setTitle.bind(this);
    }

    private freshState(): CreateEventState {
        return {
            start: moment(),
            end: moment().add(1, 'hours'),
            title: ''
        };
    }

    public async save(formEvent: FormEvent) {
        formEvent.preventDefault();
        const event: ScheduleEvent = {
            StartTime: moment(this.state.start).format(),
            EndTime: moment(this.state.end).format(),
            Title: this.state.title
        };
        await eventService.create(event);
        this.setState(this.freshState());
    }

    public setStart(date: moment.Moment) {
        this.setState({start: date});
    }

    public setEnd(date: moment.Moment) {
        this.setState({end: date});
    }

    public setTitle(event: ChangeEvent<HTMLInputElement>) {
        this.setState({title: event.target.value});
    }

    render(): React.ReactNode {
        return (
            <div className="card">
                <div className="card-header">
                    <h4 className="card-title">
                        Create new event
                    </h4>
                </div>
                <div className="card-body">
                    <form onSubmit={this.save}>
                        <DateTimeRow title="Start:"
                                     value={this.state.start}
                                     onChange={this.setStart}/>
                        <DateTimeRow title="End:"
                                     value={this.state.end}
                                     onChange={this.setEnd}/>
                        <div className="row form-group">
                            <div className="col-md-2">
                                Title
                            </div>
                            <div className="col-md-10">
                                <input type="text"
                                       className="form-control"
                                       value={this.state.title}
                                       onChange={this.setTitle}/>
                            </div>
                        </div>
                        <div className="row form-group">
                            <div className="col-md-12">
                                <button type="submit"
                                        className="btn btn-block btn-primary">
                                    <span className="fa fa-save"/>
                                    Save new event
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }

}