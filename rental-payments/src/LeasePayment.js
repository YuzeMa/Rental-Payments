import React,{Component} from 'react';
import {fetchPaymentData} from './API.js';
import PaymentDetail from './PaymentDetail.js';

class LeasePayment extends Component {
    constructor(props){
        super(props);
        this.state={
            id: "",
            data: ""
        }
    }

    componentDidMount() {
        if(this.props.location.search !== ""){
            let id = "";
            const url = this.props.location.search; //get query string
            const str = url.substring(1); //get all string after "?"
            const strs = str.split("=");   //split string by "="
            id = strs[1];          //let id equal to the vaule of leaseId
            if(strs[0]==="leaseId" && id!==""){
                this.setState({
                    id:id
                })
                fetchPaymentData(id).then(data=>this.handleFetchData(data)).catch(error=>console.log(error));
            }
        };
    }



    handleFetchData(data){
        this.setState({
            data:data
        })
        const queryString = `?leaseId=${this.state.id}`
        this.props.history.push({
            pathname: "/leases.html",
            search: queryString
        })
    }

    onIdChange(e){
        this.setState({
            id: e.target.value
        })
    }

    handleSubmit(e){
        e.preventDefault();
        fetchPaymentData(this.state.id).then(data=>this.handleFetchData(data)).catch(error=>console.log(error));
    }

    render(){
        return (
            <div className="payment-container">
                <div className="search-payment">
                    <h3>Please Enter the Lease Id</h3>
                    <form onSubmit={this.handleSubmit.bind(this)}>
                        <input value={this.state.id} placeholder="Lease Id" onChange={this.onIdChange.bind(this)} />
                        <button type="submit"> Search </button>
                    </form>
                </div>
                {
                    this.state.data === ""?
                    <h4>Loading</h4>
                    :
                    <PaymentDetail data={this.state.data}/>
                }
            </div>
        );
    }
}

export default LeasePayment;