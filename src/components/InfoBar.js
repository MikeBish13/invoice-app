
export default function InfoBar({ setFilteredData, data, filteredData, filterStatus, setFilterStatus, setAddInvoice }) {
    const filterData = (e) => {
        if (e.target.checked) {
            setFilteredData(data.filter((item) => item.status === e.target.value))
            setFilterStatus(e.target.value)
        } else {
            setFilteredData(data)
            setFilterStatus('')
        }     
    }


    return (
        <>
        <h1>Invoices</h1>
        {!filterStatus ? <p>There are {data.length} total invoices</p> : <p>There are {filteredData.length} {filterStatus} invoices</p>}
        <div className="filter-bar">
            <label htmlFor="draft">Draft<input onChange={(e) => filterData(e)} type="checkbox" value="draft" id="draft"></input></label>
            <label htmlFor="paid">Paid<input onChange={(e) => filterData(e)} type="checkbox" value="paid" id="paid"></input></label>
            <label htmlFor="pending">Pending<input onChange={(e) => filterData(e)} type="checkbox" value="pending" id="pending"></input></label>
        </div>
        <button onClick={() => setAddInvoice(true)}>New Invoice</button>
        </>
    )
}