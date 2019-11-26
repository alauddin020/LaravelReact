import React from 'react';
import ReactDOM from 'react-dom';
export default class Blog extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            blogs: [],
        }
    }
    async componentDidMount  () {
        try {
            const response = await fetch('api/blog');
            const json = await response.json();
            this.setState({ blogs: json });
        } catch (error) {
            console.log(error);
        }
        //console.log(this.state.blogs);
    }

    render() {
        return (
            <div className="container">
                {this.state.blogs.map((blog,key)=>

                    <div key={key} className="card">
                        {blog.id}
                    </div>
                )}
            </div>
        );
    }
}
if (document.getElementById('example')) {
    ReactDOM.render(<Blog />, document.getElementById('example'));
}
