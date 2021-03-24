import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';

export default function Invoice({ data }) { 
    const [date, setDate] = useState('');
    const [status, setStatus] = useState('');
    const [total, setTotal] = useState('');

    
    useEffect(() => {
        setStatus(data.status[0].toUpperCase() + data.status.substring(1));
        const newDate = new Date(data.paymentDue).toDateString().substring(3);
        setDate(newDate)
        let newTotal = parseFloat(data.total).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        setTotal(newTotal);
    }, [data])
    
    return (
        <>
        <li className="invoice-item">
            <Link to={{
            pathname: `/invoice/${data.id}`}
        }>
        <p className="invoice-list-id">#<span>{data.id}</span></p>
        <p className="invoice-list-date">Due {date}</p>
        <p className="invoice-list-name">{data.clientName}</p>
        <h3 className="invoice-list-total">£{total}</h3>
        <div className={`invoice-list-status status-btn status-btn-${data.status}`}><div className="circle"></div> <p>{status}</p></div>
        <svg className="invoice-arrow-desktop" width="7" height="10" xmlns="http://www.w3.org/2000/svg"><path d="M1 1l4 4-4 4" stroke="#7C5DFA" stroke-width="2" fill="none" fill-rule="evenodd"/></svg>
        </Link>
        </li>
        </>
    )
}