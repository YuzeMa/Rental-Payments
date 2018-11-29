import React from 'react';
import {paymentDetail} from './Function/Function.js'

function PaymentDetail(props) {
    let rows = []
    const paymentArray = paymentDetail(props.data);
    rows = paymentArray.map(eachPayment=>{ 
        return <DisplayRow from={eachPayment.from} to={eachPayment.to} days={eachPayment.days} amount={eachPayment.amount} key={eachPayment.id}/>
    })
    return (
        <div className="table-wrapper">
            <table>
                <thead><tr><th scope="col">From</th><th scope="col">To</th><th scope="col">Days</th><th scope="col">Amount</th></tr></thead>
                <tbody>{rows}</tbody>
            </table>
        </div>
    );
}

export default PaymentDetail;

function DisplayRow(props) {
    const {from, to, days, amount} = props
    return (
        <tr><td>{from}</td><td>{to}</td><td>{days}</td><td>{amount}</td></tr>
    )
}