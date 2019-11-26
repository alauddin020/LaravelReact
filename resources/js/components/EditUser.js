import React, {Component} from 'react';
import axios from 'axios';
import * as browserHistory from "lodash/_SetCache";

export default class EditUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            name: '',
            alal: '',
            error: null,
            show: true
        }
        // this.state = {name: '', email: ''};
        this.handleChange1 = this.handleChange1.bind(this);
        this.handleChange2 = this.handleChange2.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange1(e){
        this.setState({
            name: e.target.value

        })
    }
    handleChange2(e){
        this.setState({
            email: e.target.value
        })
    }

    handleSubmit(e){
        e.preventDefault();
        const users = {
            name: this.state.name,
            email: this.state.email
        }
        axios.put('/api/user/' + this.props.match.params.id, users).then((response) => {
            this.props.history.push('/');
            console.log(response.data);
        });
    }
    componentDidMount()
    {
        axios.get('/api/user/' + this.props.match.params.id + '/edit').then(response => {
           if (response.data !=='error')
           {
               this.setState({
                   name: response.data.name,email:response.data.email,alal:response.data.name,
                   show:false
               });
           }
           else
           {
               this.setState({error: response.data,show:false});
           }
            console.log(response.data);
        }).catch(error => {
            console.log(error);
        });
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
                <div>
                    <h4>User Not Found</h4>
                </div>
            );
        }
        return (
            <div className="card">
                <div className="card-header">User {this.state.alal}</div>
                <div className="card-body">
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label>Name</label>
                            <input type="text"
                                   className="form-control"
                                   value={this.state.name}
                                   onChange={this.handleChange1} />
                        </div>

                        <div className="form-group">
                            <label>Email</label>
                            <input type="text" className="form-control"
                                   value={this.state.email}
                                   onChange={this.handleChange2} />
                        </div>

                        <div className="form-group">
                            <button className="btn btn-primary">Update</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}


