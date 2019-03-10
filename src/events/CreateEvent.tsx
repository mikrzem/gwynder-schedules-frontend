import {ChangeEvent, Component, FormEvent} from 'react';
import React from 'react';
import DatePicker from 'react-datepicker';
import {ScheduleEvent} from './services/data';
import {eventService} from './services/service';
import moment from 'moment';

interface CreateEventState {
    start: Date;
    end: Date;
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
        const state = {
            start: new Date(),
            end: new Date(),
            title: ''
        };
        state.end.setHours(state.end.getHours() + 1);
        return state;
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

    public setStart(date: Date) {
        this.setState({start: date});
    }

    public setEnd(date: Date) {
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
                        <div className="row form-group">
                            <label className="col-md-2">
                                Start:
                            </label>
                            <div className="col-md-4">
                                <DatePicker onChange={this.setStart}
                                            selected={this.state.start}
                                            className="form-control"
                                            showTimeSelect/>
                            </div>
                            <label className="col-md-2">
                                End:
                            </label>
                            <div className="col-md-4">
                                <DatePicker onChange={this.setEnd}
                                            selected={this.state.end}
                                            className="form-control"
                                            showTimeSelect/>
                            </div>
                        </div>
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