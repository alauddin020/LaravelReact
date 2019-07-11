import React, { Component } from 'react';
import axios from 'axios';
import {BrowserRouter as Router,Route,Link} from "react-router-dom";
export default class User extends Component {
    constructor()
    {
        super();
        // console.log(super());
        this.state = {
            users: [],
            email: '',
            name: '',
            id: ''
        }
    }
    componentWillMount()
    {
        axios.get('api/user').then(response=> {
            this.setState({
                users:  response.data
            });
            console.log(this.state.users);
        }).catch(error=> {
            console.log(error);
        })
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
            this.componentWillMount();
        }).catch(error=> {
            console.log(error);
        })
    };
    static viewUser(id,index)
    {
        axios.get('/api/user/'+id).then(response=> {
            this.setState({
                name: response.data.name,email:response.data.email,id:response.data.id
            });
            this.setState({index:index});
            console.log(this.state.name);
        }).catch(error=> {
            console.log(error);
        })
    }

    render() {
        return (
            <div className="card">
                <div className="card-header">All User List</div>
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

