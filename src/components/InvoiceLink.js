import { Link } from 'react-router-dom'
import daysjs from 'dayjs'
import {formatCost} from '../helpers/FormHelpers'

export default function InvoiceLink({invoice}) {
    return (
        <li key={invoice.id}>
            <Link className="invoice-link" to={`/invoice/${invoice.id}`}>
                <div className="invoice-card">
                    <p>#{invoice.id}</p>
                    <p>Due {daysjs(invoice.createdAt).format('DD MMM YYYY')}</p>
                    <p>£{formatCost(invoice.total)}</p>
                    <p>{invoice.clientName}</p>
                    <p>{invoice.status}</p>
                </div>
            </Link>
        </li>
    )
}
