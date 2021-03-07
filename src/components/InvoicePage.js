import {Link} from 'react-router-dom';

export default function InvoicePage(props) {

    const { id, description, clientAddress, senderAddress, createdAt, paymentDue, status, items, total} = props.location.data;

    return (
        <>
        <button><Link to='/'>Go Back</Link></button>
        <button>Edit</button>
        <button>Delete</button>
        <button>Mark as Paid</button>
        <h1>Invoice Page</h1>
        <p>{id}</p>
        <p>{description}</p>
        <p>{clientAddress.toString()}</p>
        <p>{senderAddress.toString()}</p>
        <p>{createdAt}</p>
        <p>{paymentDue}</p>
        <p>{status}</p>
        <p>{items.toString()}</p>
        <p>{total}</p>
        </>
    )
}