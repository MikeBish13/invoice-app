import { Link } from 'react-router-dom'
import daysjs from 'dayjs'
import {formatCost, capitaliseStatus} from '../helpers/FormHelpers'
import ArrowRight from '../images/icon-arrow-right.svg'

export default function InvoiceLink({invoice: { id, createdAt, total, clientName, status}}) {
    return (
        <li className="invoice-link" key={id}>
            <Link to={`/invoice/${id}`}>
                    <p className="invoice-link-id para-bold"><span>#</span>{id}</p>
                    <p className="invoice-link-date">Due {daysjs(createdAt).format('DD MMM YYYY')}</p>
                    <p className="invoice-link-total para-bold">£{formatCost(total)}</p>
                    <p className="invoice-link-name">{clientName}</p>
                    <div className={`invoice-link-status status-btn status-btn-${status}`}><div></div><p>{capitaliseStatus(status)}</p></div>
                    <img className="invoice-link-arrow" src={ArrowRight} alt="right arrow"></img>
            </Link>
        </li>
    )
}
