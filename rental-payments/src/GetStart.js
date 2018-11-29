import React from 'react';
import {Link} from 'react-router-dom';

function GetStart() {
    return (
        <div className="getStart-container">
            <h2>To View the Payment Detail</h2>
            <Link to="/search"><button className="getStart-button">Get Start</button></Link>
        </div>
    );
}

export default GetStart;