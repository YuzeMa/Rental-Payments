import React,{Component} from 'react';
import {withRouter} from 'react-router-dom';


class SearchPage extends Component {
    constructor(props){
        super(props);
        this.state={
            id: ""
        }
    }

    onIdChange(e){
        this.setState({
            id: e.target.value
        })
    }

    handleSubmit(e){
        e.preventDefault();
        const queryString = `?leaseId=${this.state.id}`
        this.props.history.push({
            pathname: "/leases.html",
            search: queryString
        })
    }

    render(){
        return (
            <div className="searchPage-container">
                <h1>Please Enter Your Lease Id</h1>
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <input value={this.state.id} placeholder="Lease Id" onChange={this.onIdChange.bind(this)} />
                    <button type="submit"> Search </button>
                </form>
            </div>
        )
    }
}

export default withRouter(SearchPage);