import React from "react";
export default class LogIn extends React.Component{
    constructor(props)
    {
        super(props);
        this.state ={
            email: '',
            password: ''
        }
    }
    handelOnChange(e){
        this.setState({[e.target.name]: e.target.value});
    }
    login(e){
        e.preventDefault();
        console.log(this.state);
    }
    render() {
        return(
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header">Login</div>
                            <div className="card-body">
                                <form onSubmit={this.login.bind(this)}>
                                    <div className="form-group row">
                                        <label htmlFor="email" className="col-md-4 col-form-label text-md-right">Email</label>

                                        <div className="col-md-6">
                                            <input id="email"  onChange={this.handelOnChange.bind(this)} type="email" className="form-control" name="email"  required autoComplete="email" autoFocus />
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="password" className="col-md-4 col-form-label text-md-right">Password</label>

                                        <div className="col-md-6">
                                            <input  id="password"  name="password" onChange={this.handelOnChange.bind(this)} type="password" className="form-control"  />
                                        </div>
                                    </div>

                                    <div className="form-group row mb-0">
                                        <div className="col-md-8 offset-md-4">
                                            <button type="submit" className="btn btn-primary">
                                               Login
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
