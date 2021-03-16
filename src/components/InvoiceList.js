import { useState, useEffect } from 'react';
import Invoice from './Invoice';
import InfoBar from './InfoBar';
import InvoiceModal from './InvoiceModal';
import { ReactComponent as ErrorImage } from '../images/illustration-empty.svg';
import {useStore} from '../storage/store';

export default function InvoiceList() {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [filterStatus, setFilterStatus] = useState('');
    const addStatus = useStore(state => state.addStatus);

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
        <InfoBar filteredData={filteredData} setFilteredData={setFilteredData} data={data} filterStatus={filterStatus} setFilterStatus={setFilterStatus} />
        {/* If there is data present show either the data or the filtered list, otherwise display error image */}
        {data.length > 0 ? 
        <ul className="invoice-list container">
            {/* if the filtered list is empty, render an invoice component for each item. Else render an invoice component for each item in filtered list */}
        {filteredData.length === 0 ? currentItems : filteredItems}
        </ul>
        : 
        <div className="error-container container">
            <ErrorImage />
            <h1>There is nothing here</h1>
            <p>Create a new invoice by clicking the <strong>New Invoice</strong> button and get started</p>
        </div>
        }
        {addStatus && <InvoiceModal />}
        </>
    )
}