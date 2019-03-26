import moment from 'moment';
import React, {ChangeEvent, Component, FormEvent, ReactNode} from 'react';
import {Link} from 'react-router-dom';
import {Subscription} from 'rxjs';
import {ScheduleEvent} from '../services/data';
import {eventService} from '../services/service';

export interface EventsListState {

    from: moment.Moment;
    to: moment.Moment;
    events: ScheduleEvent[];
    loading: boolean;

}

export class EventsList extends Component<any, EventsListState> {

    private readonly subscription: Subscription;

    constructor(props: any) {
        super(props);
        this.state = {
            from: moment(),
            to: moment(),
            events: [],
            loading: false
        };
        this.subscription = eventService.changes.subscribe(() => this.loadEvents());
    }

    public fromChange = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        this.setState({from: moment(event.target.value)});
    };

    public toChange = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        this.setState({to: moment(event.target.value)});
    };

    public search = async (event: FormEvent) => {
        event.preventDefault();
        await this.loadEvents();
    };

    public render(): ReactNode {
        return <div className="card">
            <div className="card-header">
                <h4 className="card-title">
                    List of events
                </h4>
            </div>
            {this.state.loading ?
                (
                    <div className="card-body">
                        <div className="alert alert-info">
                            <span className="fa fa-spin fa-spinner"/>
                            Loading events...
                        </div>
                    </div>
                ) : (
                    <div className="card-body">
                        <form onSubmit={this.search}>
                            <div className="row form-group">
                                <label className="col-md-2">
                                    From:
                                </label>
                                <div className="col-md-3">
                                    <input type="date"
                                           className="form-control"
                                           value={this.state.from.format('YYYY-MM-DD')}
                                           onChange={this.fromChange}/>
                                </div>
                                <label className="col-md-2">
                                    To:
                                </label>
                                <div className="col-md-3">
                                    <input type="date"
                                           className="form-control"
                                           value={this.state.to.format('YYYY-MM-DD')}
                                           onChange={this.toChange}/>
                                </div>
                                <div className="col-md-2">
                                    <button type="submit"
                                            className="btn btn-block btn-primary">
                                        <span className="fa fa-search"/>
                                        Search
                                    </button>
                                </div>
                            </div>
                        </form>
                        <table className="table table-bordered table-striped table-hover">
                            <thead>
                                <tr>
                                    <th>
                                        Start
                                    </th>
                                    <th>
                                        End
                                    </th>
                                    <th>
                                        Title
                                    </th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.events.map(event => (
                                    <tr>
                                        <td>
                                            {moment(event.StartTime).format('YYYY-MM-DD HH:mm')}
                                        </td>
                                        <td>
                                            {moment(event.EndTime).format('YYYY-MM-DD HH:mm')}
                                        </td>
                                        <td>
                                            {event.Title}
                                        </td>
                                        <td>
                                            <Link to={'/application/schedules/page/event/' + event.ID}
                                                  className="btn btn-block btn-primary">
                                                <span className="fa fa-edit"/>
                                                Edit
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )
            }
        </div>;
    }

    public componentWillUnmount(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    private async loadEvents() {
        this.setState({loading: true});
        try {
            const events = await eventService.select(this.state.from, this.state.to);
            this.setState({events: events});
        } catch (e) {
            console.error(e);
        }
        this.setState({loading: false});
    }

}