import React, {Component} from 'react';
import './App.css';
import {BrowserRouter, Link, Route, Switch} from 'react-router-dom';
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
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
