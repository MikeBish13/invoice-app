import React from "react";
import { Link } from 'react-router-dom';

export default function Invoice({ data }) {
    return (
        <>
        <li className="invoice-item">
            <Link to={{
            pathname: `/invoice/${data.id}`,
            data: data}
        }>
        <p>{data.id}</p>
        <p>{data.createdAt}</p>
        <p>{data.clientName}</p>
        <p>{data.total}</p>
        <p>{data.status}</p>
        </Link>
        </li>
        </>
    )
}