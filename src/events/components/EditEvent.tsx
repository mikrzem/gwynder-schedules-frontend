import React, {Component, ReactNode} from 'react';
import {Link} from 'react-router-dom';
import {ScheduleEvent} from '../services/data';
import {eventService} from '../services/service';


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
        }
    }

    public componentDidMount(): void {
        console.log(JSON.stringify(this.props));
        const id = parseInt(this.props.match.params.id);
        this.loadEvent(id);
    }

    private async loadEvent(id: number) {
        this.setState({loading: true});
        try {
            this.setState({event: await eventService.get(id)})
        } catch (e) {
            console.error(e);
        }
        this.setState({loading: false});
    }

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

                            </div>
                        )
                }
            </div>
        );
    }

}