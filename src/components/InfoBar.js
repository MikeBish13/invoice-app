import {useStore} from '../storage/store';
import IconPlus from '../images/icon-plus.svg';

export default function InfoBar({ setFilteredData, data, filteredData, filterStatus, setFilterStatus }) {
    const setAddStatus = useStore(state => state.setAddStatus);

    const filterData = (e) => {
        if (e.target.checked) {
            setFilteredData(data.filter((item) => item.status === e.target.value))
            setFilterStatus(e.target.value)
            e.target.classList.add('checked')
            let checkboxes = document.querySelectorAll('.filter-check');
            checkboxes.forEach(item => {
                if (item.id !== e.target.id && item.checked) {
                    item.checked = false;
                }
            })
        } else {
            setFilteredData(data)
            setFilterStatus('')
            e.target.classList.remove('checked')
        }     
    }

    const showFilterItems = () => {
        document.querySelector('.filter-items').classList.toggle('active');
        document.querySelector('.filter-icon').classList.toggle('active');
    }


    return (
        <div className="info-bar container">
        <div className="info-bar-details">
            <h1>Invoices</h1>
            {!filterStatus ? <p className="invoice-sentence invoice-sentence-desktop">There are {data.length} total invoices</p> : <p className="invoice-sentence-desktop">There are {filteredData.length} {filterStatus} invoices</p>}
            {!filterStatus ? <p className="invoice-sentence invoice-sentence-mobile">{data.length} invoices</p> : <p className="invoice-sentence-mobile">{filteredData.length} {filterStatus}</p>}
        </div>
        <div className="filter-bar">
            <div className="filter" onClick={showFilterItems}>
                <p className="filter-button filter-button-mobile">Filter</p>
                <p className="filter-button filter-button-desktop">Filter by status</p>
                <svg className="filter-icon" width="11" height="7" xmlns="http://www.w3.org/2000/svg"><path d="M1 1l4.228 4.228L9.456 1" stroke="#7C5DFA" stroke-width="2" fill="none" fill-rule="evenodd"/></svg>
            </div>
            <ul className="filter-items">
                <li className="filter-item"><input onChange={(e) => filterData(e)} type="checkbox" className="filter-check" value="draft" id="draft"></input><label htmlFor="draft">Draft</label></li>
                <li className="filter-item"><input onChange={(e) => filterData(e)} type="checkbox" className="filter-check" value="paid" id="paid"></input><label htmlFor="paid">Paid</label></li>
                <li className="filter-item"><input onChange={(e) => filterData(e)} type="checkbox" className="filter-check" value="pending" id="pending"></input><label htmlFor="pending">Pending</label></li>
            </ul>     
        </div>
        <button className="btn btn-primary new-invoice-mobile" onClick={setAddStatus}><img src={IconPlus} alt="plus icon"></img><p>New</p></button>
        <button className="btn btn-primary new-invoice-desktop" onClick={setAddStatus}><img src={IconPlus} alt="plus icon"></img><p>New Invoice</p></button>
        </div>
    )
}