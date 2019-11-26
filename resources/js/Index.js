import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router,Route,Link,Switch } from "react-router-dom";
import User from './components/User';
import ViewUser from './components/ViewUser';
import EditUser from './components/EditUser';
import AddUser from './components/AddUser';
import E404 from "./components/E404";
export default class Index extends Component {
    render() {
        return (
            <div className="container">
                <Router>
                    <div>
                        <nav className="navbar navbar-expand-lg navbar-light bg-light">
                            <ul className="navbar-nav">
                                <li>
                                    <Link className="nav-item nav-link active" to="/">Home</Link>
                                </li>
                                <li>
                                    <Link className="nav-item nav-link" to="/user">Users</Link>
                                </li>
                            </ul>
                        </nav>
                        <Switch>
                            <Route  path="/" exact component={User} />
                            <Route  path="/user" exact component={AddUser} />
                            <Route  path="/user/:id" exact component={ViewUser}  />} />
                            <Route  path="/user/:id/edit" exact component={EditUser} />} />
                            <Route  path="/*" exact component={E404} />} />
                        </Switch>
                    </div>
                </Router>
            </div>
        );
    }
}
if (document.getElementById('fa')) {
    // ReactDOM.render(<Route><Index /></Route>, document.getElementById('fa'));
    ReactDOM.render(<Index />, document.getElementById('fa'));
}

