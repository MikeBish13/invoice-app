import React from 'react'
import {useQuery} from 'react-query'
import {Link} from 'react-router-dom'
import {useStore} from '../store'
import InvoiceForm from './InvoiceForm'



export default function InvoicePage(props) {
    const {formStatus, setFormStatus} = useStore();

    const fetchInvoice = async () => {
        const res = await fetch(`http://localhost:3004/invoices?id=${props.match.params.id}`)
        return res.json() 
    }

    const {data, status} = useQuery('invoice', fetchInvoice)

    return (
        <>
        {status === 'error' && (
            <p>This invoice does not exist</p>
        )}
        {status === 'loading' && (
            <p>Fetching invoice.....</p>
        )}
        {status === 'success' && (
            <>
            <Link to='/'>Go Back</Link>
            <div>
                <p>Status - <strong>{data[0].status}</strong></p>
                <h2>#{data[0].id}</h2>
                <p>{data[0].description}</p>
                <br></br>
                <p>{data[0].senderAddress.street}</p>
                <p>{data[0].senderAddress.city}</p>
                <p>{data[0].senderAddress.postCode}</p>
                <p>{data[0].senderAddress.country}</p>
                <h3>Invoice Date</h3>
                <p>{data[0].createdAt}</p>
                <h3>Payment Due</h3>
                <p>{data[0].paymentDue}</p>
                <h3>Bill To</h3>
                <p>{data[0].clientAddress.street}</p>
                <p>{data[0].clientAddress.city}</p>
                <p>{data[0].clientAddress.postCode}</p>
                <p>{data[0].clientAddress.country}</p>
                <h3>Sent To</h3>
                <p>{data[0].clientEmail}</p>
                <br></br>
                {data[0].items.map(item => 
                        <div>
                            <p>{item.name}</p>
                            <p>{item.quantity} x {item.price}</p>
                            <p><strong>{item.total}</strong></p>
                        </div>
                )}
                <h2>{data[0].total}</h2>
            </div>
            <button onClick={() => setFormStatus('edit')}>Edit</button>
            {formStatus === 'edit' && <InvoiceForm invoice={data[0]}/>}
            </>
        )} 
        </>
    )
}
