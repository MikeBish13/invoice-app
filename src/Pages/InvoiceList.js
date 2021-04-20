import React, { useState } from "react";
import { useQuery } from "react-query";
import InvoiceLink from "../components/InvoiceLink";
import ErrorLogo from "../images/illustration-empty.svg";
import { useStore } from "../store";
import InvoiceForm from "../components/InvoiceForm";
import { fetchData } from "../Api/ApiCalls";
import IconPlus from "../images/icon-plus.svg";
import ArrowDown from "../images/icon-arrow-down.svg";

export default function InvoiceList() {
  const { data } = useQuery("invoices", fetchData);
  const [filter, setFilter] = useState("total");
  const filteredItems =
    filter === "total" ? data : data.filter((item) => item.status === filter);
  const { formStatus, setFormStatus } = useStore();

  const setCurrentFilter = (e) => {
    let checkboxes = document.querySelectorAll(".filter-check");
    checkboxes.forEach((item) => {
      if (!e.target.checked) {
        setFilter("total");
      } else if (item.checked && item.id !== e.target.id) {
        item.checked = false;
      } else {
        setFilter(e.target.id);
      }
    });
  };

  const showFilterItems = () => {
    document.querySelector(".filter-items").classList.toggle("active");
    document.querySelector(".filter-icon").classList.toggle("active");
  };

  return (
    <div className="container">
      {/* Control Bar ============ */}
      <div className="nav-top">
        <div className="nav-top-details">
          <h1>Invoices</h1>
          {data ? (
            <p className="nav-desc-desktop">
              There are {filteredItems.length} {filter} invoices
            </p>
          ) : null}
           {data ? ( <p className="nav-desc-mobile">
              {filteredItems.length} invoices
            </p>
          ) : null}
        </div>
        <div className="filter-bar">
          <div className="filter" onClick={showFilterItems}>
            <p className="filter-text para-bold">Filter</p>
            <img src={ArrowDown} alt="arrow down" className="filter-icon"></img>
          </div>
        <ul className="filter-items">
          <li className="filter-item">
            <input
              type="checkbox"
              className="filter-check"
              id="paid"
              onChange={(e) => setCurrentFilter(e)}
            ></input>
            <label htmlFor="paid">Paid</label>
          </li>
          <li className="filter-item">
            <input
              type="checkbox"
              className="filter-check"
              id="pending"
              onChange={(e) => setCurrentFilter(e)}
            ></input>
            <label htmlFor="pending">Pending</label>
          </li>
          <li className="filter-item"> 
            <input
              type="checkbox"
              className="filter-check"
              id="draft"
              onChange={(e) => setCurrentFilter(e)}
            ></input>
            <label htmlFor="draft">Draft</label>
          </li>
        </ul>
        </div>
        <button className="btn btn-one new-invoice-btn" onClick={() => setFormStatus("add")}>
          <img src={IconPlus} alt="plus icon"></img>
          <p></p>
        </button>
      </div>
      {/* ================= */}
      {data && data.length > 0 ? (
        <ul className="invoice-list">
          {filteredItems.map((item) => (
            <InvoiceLink key={item.id} invoice={item} />
          ))}
        </ul>
      ) : (
        <div className="empty-list-alert">
          <img src={ErrorLogo} alt="error illustration"></img>
          <h4>There is nothing here</h4>
          <p>
            Create an invoice by clicking the <span className="para-bold">New Invoice</span> button and
            get started
          </p>
        </div>
      )}
      {formStatus === "add" && <InvoiceForm />}
    </div>
  );
}
