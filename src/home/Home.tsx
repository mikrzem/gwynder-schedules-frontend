import React, {Component} from 'react';
import {CreateEvent} from '../events/components/CreateEvent';

export class HomePage extends Component {

    constructor(props: Readonly<any>) {
        super(props);
        this.state = {};
    }

    render(): React.ReactNode {
        return (
            <CreateEvent/>
        );
    }

}