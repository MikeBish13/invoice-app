import React, { useState } from "react";
import { useQuery } from "react-query";
import InvoiceLink from "../components/InvoiceLink";
import ErrorLogo from "../images/illustration-empty.svg";
import { useStore } from "../store";
import InvoiceForm from "../components/InvoiceForm";
import { fetchData } from "../Api/ApiCalls";

export default function InvoiceList() {
  const { data, isLoading, isError } = useQuery("invoices", fetchData);
  const [filter, setFilter] = useState();
  const filteredItems = !filter
    ? data
    : data.filter((item) => item.status === filter);
  const { formStatus, setFormStatus } = useStore();

  const setCurrentFilter = (e) => {
    let checkboxes = document.querySelectorAll(".filter-checkbox");
    checkboxes.forEach((item) => {
      if (!e.target.checked) {
        setFilter(null);
      } else if (item.checked && item.id !== e.target.id) {
        item.checked = false;
      } else {
        setFilter(e.target.id);
      }
    });
  };

  return (
    <div>
      {isError && <p>Error</p>}
      {isLoading && <p>Loading</p>}
      <div className="nav-top">
        <h1>Invoices</h1>
        <ul>
          <li>
            <input
              type="checkbox"
              className="filter-checkbox"
              id="paid"
              onChange={(e) => setCurrentFilter(e)}
            ></input>
            <label htmlFor="paid">Paid</label>
          </li>
          <li>
            <input
              type="checkbox"
              className="filter-checkbox"
              id="pending"
              onChange={(e) => setCurrentFilter(e)}
            ></input>
            <label htmlFor="pending">Pending</label>
          </li>
          <li>
            <input
              type="checkbox"
              className="filter-checkbox"
              id="draft"
              onChange={(e) => setCurrentFilter(e)}
            ></input>
            <label htmlFor="draft">Draft</label>
          </li>
        </ul>
        <button onClick={() => setFormStatus("add")}>Add Invoice</button>
      </div>
      {data ? (
        <ul>
          {filteredItems.map((item) => (
            <InvoiceLink key={item.id} invoice={item} />
          ))}
        </ul>
      ) : (
        <div>
          <img src={ErrorLogo} alt="error illustration"></img>
          <h1>There is nothing here</h1>
          <p>
            Create an invoice by clicking the <strong>New</strong> button and
            get started
          </p>
        </div>
      )}
      {formStatus === "add" && <InvoiceForm />}
    </div>
  );
}
