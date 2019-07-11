import React, {Component} from 'react';
import axios from 'axios';

export default class AddUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            name: '',
            alal: ''
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
        axios.post('/api/user/', users).then((response) => {
            this.props.history.push('/');
            console.log(response.data);
        }).catch(error=> {
            console.log(error);
        });
    }

    render() {
        return (
            <div className="card">
                <div className="card-header"> Add User</div>
                <div className="card-body">
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label>Name</label>
                            <input type="text"
                                   className="form-control"
                                   onChange={this.handleChange1} />
                        </div>

                        <div className="form-group">
                            <label>Email</label>
                            <input type="text" className="form-control"
                                   onChange={this.handleChange2} />
                        </div>

                        <div className="form-group">
                            <button className="btn btn-primary">Add</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}


