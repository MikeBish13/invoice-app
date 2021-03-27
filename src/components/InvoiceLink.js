import { Link } from 'react-router-dom'

export default function InvoiceLink({invoice}) {
    return (
        <li key={invoice.id}>
            <Link className="invoice-link" to={`/invoice/${invoice.id}`}>
                <div className="invoice-card">
                    <p>#{invoice.id}</p>
                    <p>{invoice.createdAt}</p>
                    <p>{invoice.total}</p>
                    <p>{invoice.clientName}</p>
                    <p>{invoice.status}</p>
                </div>
            </Link>
        </li>
    )
}
