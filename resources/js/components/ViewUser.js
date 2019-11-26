import React, { Component } from 'react';
import axios from 'axios';
export default class ViewUser extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            user: {},
            error: null,
            show: true
        }
    }
    UNSAFE_componentWillMount()
    {
        axios.get('/api/user/'+this.props.match.params.id).then(response=> {
            if (response.data.data==='ok')
            {
                this.setState({
                    user:  response.data.user,
                    show: false
                });
            }
            else
            {
                this.setState({
                    error:  response.data.data,
                    show: false
                });
            }
        }).catch(error=> {
            console.log(error);
        })
    }

    render() {
        if (this.state.show)
        {
            return (
                <div><h4>Loading</h4></div>
            );
        }
        if (this.state.error === 'error')
        {
            return (
                <div className="card">
                    <div className="card-header">Opps!</div>
                    <div className="card-body">
                        <h3>No User Found</h3>
                    </div>
                </div>
            );
        }
        else
        {
            return (
                <div className="card">
                    <div className="card-header">All User List</div>
                    <div className="card-body">
                        <table className="table table-bordered">
                            <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Created</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr key={this.state.user.id}>
                                <td>{this.state.user.name}</td>
                                <td>{this.state.user.email}</td>
                                <td>{this.state.user.created_at}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            );
        }
    }
}

