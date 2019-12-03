import React, { Component } from 'react';
import axios from 'axios';
import {BrowserRouter as Router,Route,Link} from "react-router-dom";
import { LinearProgress } from '@material-ui/core';
export default class User extends Component {
    constructor()
    {
        super();
        // console.log(super());
        this.state = {
            users: [],
            email: '',
            name: '',
            id: '',
            show: true,
            completed: 0,
        }
    }
    // componentDidMount() {
    //     this.timer = setTimeout(() => this.progress(5), 2000);
    // }
    //
    // componentWillUnmount() {
    //     clearTimeout(this.timer);
    // }

    progress(completed) {
        if (completed > 100) {
            this.setState({completed: 100});
        } else {
            this.setState({completed});
            const diff = Math.random() * 10;
            this.timer = setTimeout(() => this.progress(completed + diff), 1000);
        }
        console.log(this.state.completed)
    }
    async  UNSAFE_componentWillMount()
    {
        try {
            const response = await fetch('api/user');
            const json = await response.json();
            this.setState({ users: json,show:false });
        } catch (error) {
            console.log(error);
        }
    }
    static deleteRow (id,key){
        if(window.confirm("Are you sure you want to delete this User?")){
            axios.delete('/api/user/'+id).then(response=> {
                // this.props.history.push('/');
                const users = this.state.users;
                users.splice(key, 1);
                this.setState({users});
                console.log(response.data);
            }).catch(error=> {
                console.log(error);
            })

        }
    };
    static singleDelete (id){
        axios.delete('/api/user/'+id).then(response=> {
            console.log(response.data);
            this.UNSAFE_componentWillMount();
        }).catch(error=> {
            console.log(error);
        })
    };
    static viewUser(id,index)
    {
        axios.get('/api/user/'+id).then(response=> {
            this.setState({
                name: response.data.user.name,email:response.data.user.email,id:response.data.user.id
            });
            this.setState({index:index});
            console.log(this.state.name);
        }).catch(error=> {
            console.log(error);
        })
    }
    render() {
        if (this.state.show)
        {
            return (
                <LinearProgress variant="query" color="secondary" />
            );
        }
        return (
            <div className="card">
                <div className="card-header"><strong>All User List</strong></div>
                <div className="card-body">
                    <table className="table table-bordered">
                        <thead>
                        <tr>
                            <th>SL</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Created</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.users.map((user, key) =>
                            <tr key={key}>
                                <td>{key+1}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.created_at}</td>
                                <td><Link  className="btn btn-primary" role="button" to={'user/'+user.id}>View</Link>
                                    <Link className="btn btn-info ml-2" role="button" to={'user/'+user.id+'/edit'}>Edit</Link>
                                    <button onClick={User.deleteRow.bind(this,user.id,key)} className="ml-2 btn btn-danger btn-xs">Delete</button>
                                    <button type="button" onClick={User.viewUser.bind(this,user.id,key)} className="ml-2 btn btn-warning" data-toggle="modal" data-target="#exampleModal">Delete with Modal</button>
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
                <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title text-danger" id="exampleModalLabel">Delete {this.state.name}</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <h4>Are you sure to delete this user </h4>
                            </div>
                            <div className="modal-footer">
                                <button type="button"  className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" onClick={User.singleDelete.bind(this,this.state.id)} data-dismiss="modal" className="btn btn-danger">Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
