import React, {ChangeEvent, Component, FormEvent, ReactNode} from 'react';
import {Link} from 'react-router-dom';
import {ScheduleEvent} from '../services/data';
import {eventService} from '../services/service';
import moment from 'moment';
import {DateTimeRow} from '../../utils/components/DateTimeRow';


export interface EditEventState {

    loading: boolean;
    event: ScheduleEvent | null;

}

export class EditEvent extends Component<any, EditEventState> {

    constructor(props: any) {
        super(props);
        this.state = {
            loading: false,
            event: null
        };
    }

    public componentDidMount(): void {
        console.log(JSON.stringify(this.props));
        const id = parseInt(this.props.match.params.id);
        this.loadEvent(id);
    }

    private async loadEvent(id: number) {
        this.setState({loading: true});
        try {
            this.setState({event: await eventService.get(id)});
        } catch (e) {
            console.error(e);
        }
        this.setState({loading: false});
    }

    get start() {
        if (this.state.event) {
            return moment(this.state.event.StartTime);
        } else {
            return null;
        }
    }

    public setStart = (date: moment.Moment) => {
        const event = this.state.event;
        if (event) {
            event.StartTime = moment(date).format();
            this.setState({event: event});
        }
    };

    get end() {
        if (this.state.event) {
            return moment(this.state.event.EndTime);
        } else {
            return null;
        }
    }

    public setEnd = (date: moment.Moment) => {
        const event = this.state.event;
        if (event) {
            event.EndTime = moment(date).format();
            this.setState({event: event});
        }
    };

    get title() {
        if (this.state.event) {
            return this.state.event.Title;
        } else {
            return '';
        }
    }

    public setTitle = (title: ChangeEvent<HTMLInputElement>) => {
        const event = this.state.event;
        if (event) {
            event.Title = title.target.value;
            this.setState({event: event});
        }
    };

    public save = async (event: FormEvent) => {
        event.preventDefault();
        if (this.state.event) {
            await eventService.update(this.state.event);
            window.history.back();
        }
    };

    public render(): ReactNode {
        return (
            <div className="card">
                <div className="card-header">
                    <h4 className="card-title">
                        Edit event
                        <Link to="/application/schedules/page/"
                              className="btn btn-info pull-right">
                            <span className="fa fa-level-up"/>
                            Return to list
                        </Link>
                    </h4>
                </div>
                {
                    this.state.loading || !this.state.event ?
                        (
                            <div className="card-body">
                                <div className=" alert alert-info">
                                    <span className="fa fa-spinner fa-spin"/>
                                    Loading...
                                </div>
                            </div>
                        ) : (
                            <div className="card-body">
                                <form onSubmit={this.save}>
                                    <DateTimeRow title="Start:"
                                                 value={this.start}
                                                 onChange={this.setStart}/>
                                    <DateTimeRow title="End:"
                                                 value={this.end}
                                                 onChange={this.setEnd}/>
                                    <div className="row form-group">
                                        <label className="col-md-4">
                                            Title:
                                        </label>
                                        <div className="col-md-8">
                                            <input type="text"
                                                   className="form-control"
                                                   value={this.title}
                                                   onChange={this.setTitle}/>
                                        </div>
                                    </div>
                                    <div className="row form-group">
                                        <div className="col-md-12">
                                            <button type="submit"
                                                    className="btn btn-block btn-primary">
                                                <span className="fa fa-save"/>
                                                Save event
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        )
                }
            </div>
        );
    }

}