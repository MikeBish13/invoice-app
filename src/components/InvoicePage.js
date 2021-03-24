import { useStore } from "../storage/store";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import InvoiceModal from "./InvoiceModal";

export default function InvoicePage(props) {
  // Global State
  const editStatus = useStore((state) => state.editStatus);
  const setEditStatus = useStore((state) => state.setEditStatus);

  // Local State
  const [invoiceData, setInvoiceData] = useState();
  const [deleteStatus, setDeleteStatus] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:3004/invoices/?id=${props.match.params.id}`)
      .then(function (response) {
        return response.json();
      })
      .then(function (myJson) {
        setInvoiceData(myJson[0]);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [props.match.params.id, editStatus]);

  const deleteInvoice = () => {
    fetch(`http://localhost:3004/invoices/${invoiceData.id}`, {
      method: "DELETE",
    })
      .then(setEditStatus(!editStatus))
      .then(props.history.push("/"));
  };

  const markAsPaid = () => {
    let newData = { ...invoiceData, status: "paid" };
    fetch(`http://localhost:3004/invoices/${invoiceData.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newData),
    }).then(props.history.push("/"));
  };

  return (
    <>
      {invoiceData && (
        <div className="invoice-details container">
          <button className="btn-back">
            <Link to="/">
              <svg width="7" height="10" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M6.342.886L2.114 5.114l4.228 4.228"
                  stroke="#9277FF"
                  stroke-width="2"
                  fill="none"
                  fill-rule="evenodd"
                />
              </svg>
              Go Back
            </Link>
          </button>
          <div className="edit-bar">
            <div className="status-bar">
              <p>Status</p>{" "}
              <div className={`status-btn status-btn-${invoiceData.status}`}>
                <div></div>
                <p>{invoiceData.status}</p>
              </div>
            </div>
            <div className="edit-bar-right">
              <button className="btn btn-quarternary" onClick={setEditStatus}>
                Edit
              </button>
              <button
                className="btn btn-tertiary"
                onClick={() => setDeleteStatus(!deleteStatus)}
              >
                Delete
              </button>
              <button className="btn btn-secondary" onClick={markAsPaid}>
                Mark as Paid
              </button>
            </div>
          </div>
          <div className="invoice-grid">
            <div className="invoice-id">
              <p className="id-number">
                #<span className="strong-sm">{invoiceData.id}</span>
              </p>
              <p>{invoiceData.description}</p>
            </div>
            <div className="sender-address address-para">
              <p>{invoiceData.senderAddress.street}</p>
              <p>{invoiceData.senderAddress.city}</p>
              <p>{invoiceData.senderAddress.postCode}</p>
              <p>{invoiceData.senderAddress.country}</p>
            </div>
            <div className="created-date">
              <p>Invoice Date</p>
              <p className="strong-lg">{invoiceData.createdAt}</p>
            </div>
            <div className="due-date">
              <p>Payment Due</p>
              <p className="strong-lg">{invoiceData.createdAt}</p>
            </div>
            <div className="client-address address-para">
              <p className="bill-to">Bill To</p>
              <p className="client-name">
                <span className="strong-lg">{invoiceData.clientName}</span>
              </p>
              <p>{invoiceData.clientAddress.street}</p>
              <p>{invoiceData.clientAddress.city}</p>
              <p>{invoiceData.clientAddress.postCode}</p>
              <p>{invoiceData.clientAddress.country}</p>
            </div>
            <div className="client-email">
              <p className="sent-to">Sent To</p>
              <p className="strong-lg">{invoiceData.clientEmail}</p>
            </div>
            <div className="invoice-items">
                <div className="mobile-row">
                    {invoiceData.items.map((item) => {
                    return (
                        <div className="mobile-row-container">
                            <div>
                                <p className="item-name">{item.name}</p>
                                <p className="item-price">
                                {item.quantity} x £ {item.price}
                                </p>
                            </div>
                                <p className="item-total">£ {item.total}</p>
                        </div>   
                    )})}
                    <div className="invoice-footer">
                        <p className="amount-due">Amount Due</p>
                        <p className="amount-total">£ {invoiceData.total}</p>
                    </div>
                </div>
              
                <div class="desktop-row">
                    <table>
                      <thead>
                        <tr>
                          <th>Item Name</th>
                          <th>QTY</th>
                          <th>Price</th>
                          <th>Total</th>
                        </tr>
                      </thead>
                      {invoiceData.items.map((item) => {
                        return (
                      <tr>
                        <td className="row-bold">{item.name}</td>
                        <td className="row-reg">{item.quantity}</td>
                        <td className="row-reg">£ {parseFloat(item.price).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                        <td className="row-bold">£ {parseFloat(item.total).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                      </tr>
                    )})}
                    </table>
                
                    <div className="invoice-footer">
                        <p className="amount-due">Amount Due</p>
                        <p className="amount-total">£ {parseFloat(invoiceData.total).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
                    </div>
            </div>

          </div>
        </div>




      {editStatus && <InvoiceModal invoiceData={invoiceData} />}
      {deleteStatus && (
        <div className="delete-modal">
          <p>
            Are you sure you want to delete invoice #{invoiceData.id}? This
            action cannot be done.
          </p>
          <button onClick={() => setDeleteStatus(!deleteStatus)}>Cancel</button>
          <button onClick={deleteInvoice}>Delete</button>
        </div>
      )}
    </div>)}
</>
)}
