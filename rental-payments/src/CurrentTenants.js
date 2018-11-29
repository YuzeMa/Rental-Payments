import React from 'react';
import icon from './personal.jpg';

export default function CurrentTenants(props) {
    let rows = []
    const tenants = props.tenants
    rows = tenants.map( tenant =>{ 
        return <DisplayRow id={tenant.id} tenant={tenant.tenant} key={tenant.id} displayDetail={props.displayDetail}/>
    })
    return (
        <div className="currentTenants-container">
            {rows}
        </div>
    );
}

function DisplayRow(props) {
    return (
        <div className="tenant-wrapper" onClick={()=>props.displayDetail(props.id)}>
            <p><span className="name-wrapper">{props.tenant}</span></p>
            <img className="personal-icon" src={icon} alt="personal"/>
        </div>
    )
}