import React, { Component } from 'react';
import axios from 'axios';
export default class ViewUser extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            user: {}
        }
    }
    componentWillMount()
    {
        axios.get('/api/user/'+this.props.match.params.id).then(response=> {
            this.setState({
                user:  response.data
            });
            console.log(this.state.user);
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

