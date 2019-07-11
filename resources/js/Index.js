import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router,Route,Link} from "react-router-dom";
import User from './components/User';
import Example from './components/Example';
import ViewUser from './components/ViewUser';
import EditUser from './components/EditUser';
import AddUser from './components/AddUser';

export default class Index extends Component {
    render() {
        return (
            <div className="container">
                <Router>
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <a className="navbar-brand" href="javascript:void(0)">React</a>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                            <div className="navbar-nav">
                                <Link className="nav-item nav-link active" to="/">Home<span className="sr-only">(current)</span></Link>
                                <Link className="nav-item nav-link" to="/user" >Add User</Link>
                            </div>
                        </div>
                    </nav><br/>
                        <Route path="/" exact component={User} />
                        <Route path="/user" exact component={AddUser} />
                        <Route path="/user/:id" exact  render={props=><ViewUser{...props} />} />
                        <Route path="/user/:id/edit" exact render={props=><EditUser{...props} />} />
                </Router>
            </div>
        );
    }
}
if (document.getElementById('fa')) {
    ReactDOM.render(<Index />, document.getElementById('fa'));
}

