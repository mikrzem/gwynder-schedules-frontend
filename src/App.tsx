import React, {Component} from 'react';
import './App.css';
import {BrowserRouter, Link, Route, Switch} from 'react-router-dom';
import {EditEvent} from './events/components/EditEvent';
import {HomePage} from './home/Home';

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div className="container-fluid top-margin">
                    <Switch>
                        <Route exact
                               path='/application/schedules/page/'
                               component={HomePage}/>
                        <Route exact
                               path='/application/schedules/page/event/:id'
                               component={EditEvent}/>
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
