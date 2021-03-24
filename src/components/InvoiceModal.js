import { useRef, useState } from "react";
import { useStore } from "../storage/store";
import IconDelete from '../images/icon-delete.svg';
import IconPlus from '../images/icon-plus.svg';

export default function NewInvoice({ invoiceData }) {
  //  Global State
  const addStatus = useStore((state) => state.addStatus);
  const setAddStatus = useStore((state) => state.setAddStatus);
  const editStatus = useStore((state) => state.editStatus);
  const setEditStatus = useStore((state) => state.setEditStatus);

  // Local State
  const [submitStatus, setSubmitStatus] = useState("");

  // Local refernces to form
  const fromAddress = useRef();
  const fromCity = useRef();
  const fromPostCode = useRef();
  const fromCountry = useRef();
  const toName = useRef();
  const toEmail = useRef();
  const toAddress = useRef();
  const toCity = useRef();
  const toPostCode = useRef();
  const toCountry = useRef();
  const invoiceDate = useRef();
  const invoiceTerms = useRef();
  const productDescription = useRef();

  // Functions for adding data to invoice
  const createId = () => {
    let ID =
      String.fromCharCode(65 + Math.floor(Math.random() * 26)) +
      String.fromCharCode(65 + Math.floor(Math.random() * 26)) +
      Math.floor(1000 + Math.random() * 9000);
    return ID;
  };

  const addNewItem = () => {
    let tableRef = document.getElementById("item-table");

    let newRow = tableRef.insertRow(-1);
    newRow.classList.add("table-row");

    let nameCell = newRow.insertCell(0);
    let newName = document.createElement("input");
    newName.type = "text";
    nameCell.appendChild(newName);

    let qtyCell = newRow.insertCell(1);
    let newQty = document.createElement("input");
    newQty.type = "number";
    newQty.classList.add("qty");
    newQty.placeholder = 0;
    newQty.addEventListener("change", calculateTotal);
    qtyCell.appendChild(newQty);

    let priceCell = newRow.insertCell(2);
    let newPrice = document.createElement("input");
    newPrice.type = "number";
    newPrice.classList.add("price");
    newPrice.placeholder = 0;
    newPrice.addEventListener("change", calculateTotal);
    priceCell.appendChild(newPrice);

    let totalCell = newRow.insertCell(3);
    let newTotal = document.createElement("input");
    newTotal.type = "number";
    newTotal.setAttribute("disabled", true);
    newTotal.classList.add("total");
    newTotal.value = 0;
    totalCell.appendChild(newTotal);

    let deleteCell = newRow.insertCell(4);
    let newDeleteButton = document.createElement("button");
    newDeleteButton.type = "button";
    newDeleteButton.addEventListener("click", deleteItem);
    newDeleteButton.classList.add("trash");
    deleteCell.appendChild(newDeleteButton);
  };


  const calculateTotal = (e) => {
    let item = e.target.parentNode.parentNode;
    let total = item.querySelector(".total");
    let qty = item.querySelector(".qty");
    let price = item.querySelector(".price");
    total.value = qty.value * price.value;
  };

  const deleteItem = (e) => {
    e.target.parentNode.parentNode.remove();
  };

  const createPaymentDate = () => {
    let currentDate = new Date(invoiceDate.current.value);
    let currentMilliseconds = Date.parse(currentDate);
    let increment = invoiceTerms.current.value * 86400000;
    let newDate = new Date(currentMilliseconds + increment).toISOString();
    return newDate.split("T")[0];
  };

  //Functions for processing data 
  const addItems = () => {
    let currentItems = document.querySelectorAll(".table-row");
    let newItems = [];
    currentItems.forEach((item) => {
      let newItem = {
        name: item.childNodes[0].childNodes[0].value,
        quantity: item.childNodes[1].childNodes[0].value,
        price: item.childNodes[2].childNodes[0].value,
        total: item.childNodes[3].childNodes[0].value,
      };
      newItems.push(newItem);
    });
    return newItems;
  };

  const itemsTotal = () => {
    let totals = document.querySelectorAll(".total");
    let total = [];
    totals.forEach((item) => {
      let val = parseInt(item.value);
      total.push(val);
    });
    return total.reduce((a, b) => a + b, 0);
  };

  const createFormData = (e) => {
    e.preventDefault();
    const newData = {
      id: createId(),
      createdAt: invoiceDate.current.value,
      paymentDue: createPaymentDate(),
      description: productDescription.current.value,
      paymentTerms: invoiceTerms.current.value,
      clientName: toName.current.value,
      clientEmail: toEmail.current.value,
      status: submitStatus,
      senderAddress: {
        street: fromAddress.current.value,
        city: fromCity.current.value,
        postCode: fromPostCode.current.value,
        country: fromCountry.current.value,
      },
      clientAddress: {
        street: toAddress.current.value,
        city: toCity.current.value,
        postCode: toPostCode.current.value,
        country: toCountry.current.value,
      },
      items: addItems(),
      total: itemsTotal(),
    };
    console.log(newData);

    if (addStatus) {
      postNewInvoice(newData)
    } else {
      editInvoice(newData);
    }
  };

  //Post new invoice
  const postNewInvoice = (newData) => {
    fetch("http://localhost:3004/invoices", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(newData),
    })
      .then((response) => response.json())
      .then(setAddStatus)
      .then(window.location.reload(true))
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  //Edit existing invoice
  const editInvoice = (newData) => {
    fetch(`http://localhost:3004/invoices/${invoiceData.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newData),
    })
    .then(setEditStatus)
    .catch((error) => {
      console.error("Error:", error);
    });
  }

  //Form functionality
  const closeForm = () => {
    if (addStatus) {
      setAddStatus();
    } else {
      setEditStatus();
    }
  };

  //Form validity
  const validateForm = (e) => {
    e.preventDefault();
    let form = document.querySelector('form');
    let formItems = form.querySelectorAll('input');
    let inputErrors = []
    formItems.forEach(item => {
      if (!item.value) {
          inputErrors.push(item)
          item.classList.add('error')
      } else {
        item.classList.remove('error')
      }
    })
    if (inputErrors.length === 0) {
      createFormData(e);
    } else {
      console.log('all fields must be filled')
    };
  }

  return (
    <div className="invoice-modal">
      <div className="container">
    <button className="btn-back" onClick={closeForm}>
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
          </button>
      {addStatus ? <h1>New Invoice</h1> : <h1>Edit #{invoiceData.id}</h1>}
      <form className="invoice-form" onSubmit={submitStatus === 'pending' ? validateForm : createFormData}>
          <p className="form-title bill-from">Bill from</p>
          <div className="from-street-address">
          <label htmlFor="from-address">Street Address</label>
          <input
            type="text"
            id="from-address"
            ref={fromAddress}
            defaultValue={editStatus ? invoiceData.senderAddress.street : ""}
          ></input>
          </div>
          <div className="from-city">
              <label htmlFor="bill-from-city">City</label>
              <input
                type="text"
                id="bill-from-city"
                ref={fromCity}
                defaultValue={editStatus ? invoiceData.senderAddress.city : ""}
              ></input>
              </div>
              <div className="from-post-code">
              <label htmlFor="bill-from-post-code">Post Code</label>
              <input
                type="text"
                id="bill-from-post-code"
                ref={fromPostCode}
                defaultValue={editStatus ? invoiceData.senderAddress.postCode : ""}
              ></input>
              </div>
              <div className="from-country">
              <label htmlFor="bill-from-country">Country</label>
              <input
                type="text"
                id="bill-from-country"
                ref={fromCountry}
                defaultValue={editStatus ? invoiceData.senderAddress.country : ""}
              ></input>
              </div>
          <p className="form-title bill-to">Bill To</p>
          <div className="client-name">
            <label htmlFor="bill-to-name">Client's Name</label>
            <input
              type="text"
              id="bill-to-name"
              ref={toName}
              defaultValue={editStatus ? invoiceData.clientName : ""}
            ></input>
          </div>
          <div className="client-email">
            <label htmlFor="bill-to-email">Client's Email</label>
            <input
              type="text"
              id="bill-to-email"
              placeholder="e.g.email@example.com"
              ref={toEmail}
              defaultValue={editStatus ? invoiceData.clientEmail : ""}
            ></input>
          </div>
          <div className="client-address">
            <label htmlFor="bill-to-address">Street Address</label>
            <input
              type="text"
              id="bill-to-address"
              ref={toAddress}
              defaultValue={editStatus ? invoiceData.clientAddress.street : ""}
            ></input>
          </div>
            <div className="client-city">
              <label htmlFor="bill-to-city">City</label>
              <input
                type="text"
                id="bill-to-city"
                ref={toCity}
                defaultValue={editStatus ? invoiceData.clientAddress.city : ""}
              ></input>
            </div>
            <div className="client-post-code">
              <label htmlFor="bill-to-post-code">Post Code</label>
              <input
                type="text"
                id="bill-to-post-code"
                ref={toPostCode}
                defaultValue={editStatus ? invoiceData.clientAddress.postCode : ""}
              ></input>
            </div>
            <div className="client-country">
              <label htmlFor="bill-to-country">Country</label>
              <input
                type="text"
                id="bill-to-country"
                ref={toCountry}
                defaultValue={editStatus ? invoiceData.clientAddress.country : ""}
              ></input>
            </div>
        {/* Invoice Details */}
        <div className="invoice-date">
          <label htmlFor="invoice-date">Invoice Date</label>
          <input
            type="date"
            id="invoice-date"
            ref={invoiceDate}
            defaultValue={editStatus ? invoiceData.createdAt : "2021-03-10"}
          ></input>
        </div>
        <div className="invoice-terms">
          <label htmlFor="invoice-terms">Invoice Terms</label>
          <select defaultValue={editStatus ? invoiceData.paymentTerms : '30'} ref={invoiceTerms}>
            <option value="1">Net 1 Day</option>
            <option value="7">Net 7 Days</option>
            <option value="14">Net 14 Days</option>
            <option value="30">Net 30 Days</option>
          </select>
        </div>
        <div className="product-description">
          <label htmlFor="product-description">Product Description</label>
          <input
            type="text"
            id="product-description"
            placeholder="e.g. Graphic Design Service"
            ref={productDescription}
            defaultValue={editStatus ? invoiceData.description : ''}
          ></input>
        </div>
        {/* Item List Desktop Version */}
        <div className="item-list">
          <h3>Item List</h3>
          <table id="item-table">
            <thead>
              <tr>
                <th>Item Name</th>
                <th>Qty</th>
                <th>Price</th>
                <th>Total</th>
                <th>Delete</th>
              </tr>
            </thead>
            {editStatus && invoiceData.items.map((item) => {
              return (
                <tr className="table-row">
                  <td><input type='text' defaultValue={item.name}></input></td>
                  <td><input className="qty" type='text' defaultValue={item.quantity} onChange={calculateTotal}></input></td>
                  <td><input className="price" type='text' defaultValue={item.price} onChange={calculateTotal}></input></td>
                  <td><input className="total" type='text' disabled defaultValue={item.total}></input></td>
                  <td><button className="trash" type="button" onClick={deleteItem}><img src={IconDelete} alt="trash can"></img></button></td>
                </tr>
              )
            })}
          </table>
          <button className="btn btn-six add-item-btn" type="button" onClick={addNewItem}>
            <img src={IconPlus} alt="plus icon"></img> Add Item
          </button>
        </div>
    
        {/* Buttons */}
        {addStatus && <div className="add-buttons">
          <input
            type="button"
            name="discard"
            className="btn btn-quarternary discard-button"
            value="Discard"
            onClick={closeForm}
          ></input>
          <input
            type="submit"
            name="draft"
            className="btn btn-five draft-button"
            value="Save as Draft"
            onClick={() => setSubmitStatus("draft")}
          ></input>
          <input
            type="submit"
            name="save"
            className="btn btn-secondary send-button"
            value="Save & Send"
            onClick={() => setSubmitStatus("pending")}
          ></input>
        </div>}
        {editStatus && <div className="edit-buttons">
          <input type="button" onClick={setEditStatus} value="Cancel"></input>
          <input
            type="submit"
            name="save"
            className="send-button"
            value="Save Changes"
            onClick={() => setSubmitStatus("pending")}
          ></input>  
        </div>} 
      </form>
      </div>
    </div>
  );
}
