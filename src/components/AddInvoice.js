import { useRef, useState } from "react";

export default function NewInvoice({ setAddInvoice }) {
  const [submitStatus, setSubmitStatus] = useState("");

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
  };

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
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
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
    newQty.value = 0;
    newQty.addEventListener("change", calculateTotal);
    qtyCell.appendChild(newQty);

    let priceCell = newRow.insertCell(2);
    let newPrice = document.createElement("input");
    newPrice.type = "number";
    newPrice.classList.add("price");
    newPrice.value = 0;
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
      //   setItems(currentValue => [...currentValue, newItem]);
    });
    return newItems;
  };

  const createId = () => {
    let ID =
      String.fromCharCode(65 + Math.floor(Math.random() * 26)) +
      String.fromCharCode(65 + Math.floor(Math.random() * 26)) +
      Math.floor(1000 + Math.random() * 9000);
    return ID;
  };

  const createPaymentDate = () => {
    let currentDate = new Date(invoiceDate.current.value);
    let currentMilliseconds = Date.parse(currentDate);
    let increment = invoiceTerms.current.value * 86400000;
    let newDate = new Date(currentMilliseconds + increment).toISOString();
    return newDate.split("T")[0];
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

  return (
    <>
      <button onClick={() => setAddInvoice(false)}>Discard</button>
      <h1>New Invoice</h1>
      <form onSubmit={createFormData}>
        {/* Bill From */}
        <div className="bill-from">
          <p>Bill from</p>
          <label htmlFor="from-address">Street Address</label>
          <input type="text" id="from-address" ref={fromAddress}></input>
          <div className="bill-from-flex">
            <div>
              <label htmlFor="bill-from-city">City</label>
              <input type="text" id="bill-from-city" ref={fromCity}></input>
            </div>
            <div>
              <label htmlFor="bill-from-post-code">Post Code</label>
              <input
                type="text"
                id="bill-from-post-code"
                ref={fromPostCode}
              ></input>
            </div>
            <div>
              <label htmlFor="bill-from-country">Country</label>
              <input
                type="text"
                id="bill-from-country"
                ref={fromCountry}
              ></input>
            </div>
          </div>
        </div>
        {/* Bill To */}
        <div className="bill-to">
          <p>Bill To</p>
          <div>
            <label htmlFor="bill-to-name">Client's Name</label>
            <input type="text" id="bill-to-name" ref={toName}></input>
          </div>
          <div>
            <label htmlFor="bill-to-email">Client's Email</label>
            <input
              type="text"
              id="bill-to-email"
              placeholder="e.g.email@example.com"
              ref={toEmail}
            ></input>
          </div>
          <div>
            <label htmlFor="bill-to-address">Street Address</label>
            <input type="text" id="bill-to-address" ref={toAddress}></input>
          </div>
          <div className="bill-to-flex">
            <div>
              <label htmlFor="bill-to-city">City</label>
              <input type="text" id="bill-to-city" ref={toCity}></input>
            </div>
            <div>
              <label htmlFor="bill-to-post-code">Post Code</label>
              <input
                type="text"
                id="bill-to-post-code"
                ref={toPostCode}
              ></input>
            </div>
            <div>
              <label htmlFor="bill-to-country">Country</label>
              <input type="text" id="bill-to-country" ref={toCountry}></input>
            </div>
          </div>
        </div>
        {/* Invoice Details */}
        <div className="invoice-date">
          <label htmlFor="invoice-date">Invoice Date</label>
          <input type="date" id="invoice-date" ref={invoiceDate}></input>
        </div>
        <div className="invoice-terms">
          <label htmlFor="invoice-terms">Invoice Terms</label>
          <select defaultValue="30" ref={invoiceTerms}>
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
          ></input>
        </div>
        {/* Item List */}
        <div className="item-list">
          <h2>Items</h2>
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
          </table>
          <button type="button" onClick={addNewItem}>
            Add Item
          </button>
        </div>
        {/* Buttons */}
        <input
          type="button"
          name="discard"
          className="discard-button"
          value="Discard"
        ></input>
        <input
          type="submit"
          name="draft"
          className="draft-button"
          value="Save as Draft"
          onClick={() => setSubmitStatus("draft")}
        ></input>
        <input
          type="submit"
          name="save"
          className="send-button"
          value="Save and Send"
          onClick={() => setSubmitStatus("pending")}
        ></input>
      </form>
    </>
  );
}
