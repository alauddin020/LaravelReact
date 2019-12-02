import React from "react";
export default class Logout extends React.Component{
    constructor(props)
    {
        super(props);
        // this.refresh();
        this.logout();
        this.isLogin();
    }
    logout(){
        localStorage.removeItem('user');
        window.location.assign('/login');
    }
    isLogin()
    {
        if (localStorage.getItem('user') ===null) {
            this.props.history.push('/login');
        }
    }
    refresh()
    {

    }
    render() {
        return(
          <div>
              <strong>Log out Successfully</strong>
          </div>
        );
    }
}
