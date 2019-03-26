import React, {Component} from 'react';
import {CreateEvent} from '../events/components/CreateEvent';
import {EventsList} from '../events/components/EventsList';

export class HomePage extends Component {

    constructor(props: Readonly<any>) {
        super(props);
        this.state = {};
    }

    render(): React.ReactNode {
        return (
            <div>
                <div className="row form-group">
                    <div className="col-md-12">
                        <CreateEvent/>
                    </div>
                </div>
                <div className="row form-group">
                    <div className="col-md-12">
                        <EventsList/>
                    </div>
                </div>
            </div>
        );
    }

}