import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router,Route,Link,Switch } from "react-router-dom";
import User from './components/User';
import ViewUser from './components/ViewUser';
import EditUser from './components/EditUser';
import AddUser from './components/AddUser';
import LogIn from "./components/LogIn";
import E404 from "./components/E404";
import Logout from "./components/Logout";
import axios from "axios";
// import {Navbar, Nav, NavDropdown, Form, FormControl, Button} from 'react-bootstrap';
export default class Index extends Component {
    constructor(props){
        super(props);
        this.fetchUser();
    }
    fetchUser(){
        if (localStorage.getItem('tokenId') !==null)
        {
            const api = '/api/user-login/';
            const token = localStorage.getItem('tokenId');
            axios.get(api, {headers: {"Authorization": `Bearer ${token}`}}).then(response => {
                console.log(response.data)
            }).catch(error => {
                console.log(error);
            })
        }
    }
    render() {
        return (
            <div className="">
                <Router>
                        <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
                            <Link className="navbar-brand" to="/">Home</Link>
                            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarNavDropdown">
                                <ul className="navbar-nav">
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/user">Add User</Link>
                                    </li>
                                    {localStorage.getItem('user')===null ?
                                        (<li className="nav-item">
                                            <Link className="nav-link" to="/login">Login</Link>
                                        </li>)
                                        : (
                                            <li className="nav-item dropdown">
                                                <a className="nav-link dropdown-toggle" href={''} id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                    {localStorage.getItem('user')}
                                                </a>
                                                <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                                    <Link className="dropdown-item" to="/dashboard">{localStorage.getItem('user')}</Link>
                                                    <Link className="dropdown-item" to="/logout">Logout</Link>
                                                </div>
                                            </li>
                                        )}

                                </ul>
                            </div>
                        </nav>
                    <div className={'container'} style={{marginTop: '5%'}}>
                        <Switch>
                            <Route  path="/" exact component={User} />
                            <Route  path="/user" exact component={AddUser} />
                            <Route  path="/user/:id" exact component={ViewUser}  />} />
                            <Route  path="/user/:id/edit" exact component={EditUser} />} />
                            <Route  path="/login" exact component={LogIn} />} />
                            <Route  path="/logout" exact component={Logout} />} />
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

