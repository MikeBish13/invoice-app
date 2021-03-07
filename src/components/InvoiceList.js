import { useState, useEffect } from 'react';
import Invoice from './Invoice';
import InfoBar from './InfoBar';
import AddInvoice from './AddInvoice';
import { ReactComponent as ErrorImage } from '../images/illustration-empty.svg';

export default function InvoiceList() {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [filterStatus, setFilterStatus] = useState('');
    const [addInvoice, setAddInvoice ] = useState(true);

    useEffect(() => {
        fetch('http://localhost:3004/invoices',
            {
                headers : { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
            },
        }
        )
        .then(function(response){
            return response.json();
        })
        .then(function(myJson){
            setData(myJson);
        })
        .catch((error) => {
            console.error("Error:", error);
          });
      }, []);

      const currentItems = data.map((item) => {
          return (
              <Invoice key={item.id} data={item} />
          )
      });

      const filteredItems = filteredData.map((item) => {
          return (
              <Invoice key={item.id} data={item} />
          )
      })

    return (
        <>
        <InfoBar filteredData={filteredData} setFilteredData={setFilteredData} data={data} filterStatus={filterStatus} setFilterStatus={setFilterStatus} setAddInvoice={setAddInvoice}/>
        {/* If there is data present show either the data or the filtered list, otherwise display error image */}
        {data.length > 0 ? 
        <ul className="invoice-list">
            {/* if the filtered list is empty, render an invoice component for each item. Else render an invoice component for each item in filtered list */}
        {filteredData.length === 0 ? currentItems : filteredItems}
        </ul>
        : 
        <ErrorImage />}
        {addInvoice && <AddInvoice setAddInvoice={setAddInvoice} />}
        </>
    )
}