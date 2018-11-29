import React,{Component} from 'react';
import {withRouter} from 'react-router-dom';
import CurrentTenants from './CurrentTenants.js';
import PaymentDetail from './PaymentDetail.js';
import {fetchCurrentTenants,fetchPaymentData} from './API.js';


class SearchPage extends Component {
    constructor(props){
        super(props);
        this.state={
            id: "",
            tenants: "",
            paymentDetail: ""
        }
    }

    componentDidMount(){
        fetchCurrentTenants().then(data=>this.handleCurrentTenants(data)).catch(error=>console.log(error));
    }

    handleCurrentTenants(data){
        this.setState({
            tenants: data
        })
    }

    handlePaymentDetail(data){
        this.setState({
            paymentDetail: data
        })
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

    displayDetail(id) {
        console.log(id);
        fetchPaymentData(id).then(data=>this.handlePaymentDetail(data)).catch(error=>console.log(error));
    }

    render(){
        return (
            <div className="searchPage-container">
                <div>
                    <h1>Search For Any Lease Id</h1>
                    <form onSubmit={this.handleSubmit.bind(this)}>
                        <input value={this.state.id} placeholder="Lease Id" onChange={this.onIdChange.bind(this)} />
                        <button type="submit"> Search </button>
                    </form>
                </div>
                {
                    this.state.tenants === "" ?
                    ''
                    :
                    <div>
                        <h2>Current Tenants: </h2>
                        <p><i>click on icon to see payment detail</i></p>
                        <CurrentTenants tenants={this.state.tenants} displayDetail={this.displayDetail.bind(this)}/>
                        {
                            this.state.paymentDetail === "" ?
                            ''
                            :
                            <PaymentDetail data={this.state.paymentDetail}/>
                        }
                    </div>
                }
                
            </div>
        )
    }
}

export default withRouter(SearchPage);