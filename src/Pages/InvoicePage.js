import React from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { Link } from "react-router-dom";
import { useStore } from "../store";
import InvoiceForm from "../components/InvoiceForm";
import { fetchInvoice, setPaidInvoice } from "../Api/ApiCalls";
import DeleteModal from "../components/DeleteModal";
import { formatCost, capitaliseStatus } from "../helpers/FormHelpers";
import BackArrow from "../images/icon-arrow-left.svg";

export default function InvoicePage(props) {
  const { formStatus, setFormStatus, deleteModal, setDeleteModal } = useStore();
  const invoiceId = props.match.params.id;
  const { data, status } = useQuery(["invoice", invoiceId], () =>
    fetchInvoice(invoiceId)
  );
  const queryClient = useQueryClient();
  const paidMutation = useMutation(setPaidInvoice, {
    onSuccess: () => queryClient.invalidateQueries("invoice"),
  });

  return (
    <div className="invoice-page container">
      {status === "error" && <p>This invoice does not exist</p>}
      {status === "loading" && <p>Fetching invoice.....</p>}
      {status === "success" && (
        <div>
          <Link to="/" className="btn-back">
            <img src={BackArrow} alt="back arrow"></img>
            <p>Go Back</p>
          </Link>
          <div className="status-bar">
            <div className="status-bar-left">
              <p>Status</p>
              <div className={`status-btn status-btn-${data[0].status}`}>
                <div className="status-dot"></div>
                <p>{capitaliseStatus(data[0].status)}</p>
              </div>
            </div>
            <div className="control-buttons">
              <button className="btn btn-four" onClick={() => setFormStatus("edit")}>Edit</button>
              <button className="btn btn-three" onClick={() => setDeleteModal(true)}>Delete</button>
              <button className="btn btn-two" onClick={() => paidMutation.mutate(data[0].id)}>
                Mark as paid
              </button>
            </div>
          </div>
          <div className="invoice-details">
            <p className="para-lg invoice-details-id-desc">
              #<span className="para-bold">{data[0].id}</span>
              <p>{data[0].description}</p>
            </p>
            <div className="invoice-details-sender-address">
              <p className="para-address">{data[0].senderAddress.street}</p>
              <p className="para-address">{data[0].senderAddress.city}</p>
              <p className="para-address">{data[0].senderAddress.postCode}</p>
              <p className="para-address">{data[0].senderAddress.country}</p>
            </div>
            <div className="invoice-details-invoice-date">
              <p>Invoice Date</p>
              <p className="para-bold para-lg">{data[0].createdAt}</p>
            </div>
            <div className="invoice-details-payment-date">
              <p>Payment Due</p>
              <p className="para-bold para-lg">{data[0].paymentDue}</p>
            </div>
            <div className="invoice-details-client-details">
              <p>Bill To</p>
              <p className="para-bold para-lg">{data[0].clientName}</p>
              <p className="para-address">{data[0].clientAddress.street}</p>
              <p className="para-address">{data[0].clientAddress.city}</p>
              <p className="para-address">{data[0].clientAddress.postCode}</p>
              <p className="para-address">{data[0].clientAddress.country}</p>
            </div>
            <div className="invoice-details-client-email">
              <p>Sent To</p>
              <p className="para-bold para-lg">{data[0].clientEmail}</p>
            </div>
            <div className="invoice-details-items">
              {data[0].items &&
                data[0].items.map((item) => (
                  <div key={item.id} className="invoice-details-item">
                    <div>
                      <p className="para-bold">{item.name}</p>
                      <p className="item-sum">
                        {item.quantity} x £{formatCost(item.price)}
                      </p>
                    </div>
                    <p className="para-bold invoice-details-items-total">
                      £ {formatCost(item.total)}
                    </p>
                  </div>
                ))}
            </div>
            <div className="invoice-details-items-desktop">
              <table>
                <tr>
                  <th>
                    <p className="para-address">Item Name</p>
                  </th>
                  <th>
                    <p className="para-address">QTY.</p>
                  </th>
                  <th>
                    <p className="para-address">Price</p>
                  </th>
                  <th>
                    <p className="para-address">Total</p>
                  </th>
                </tr>
                {data[0].items &&
                  data[0].items.map((item) => (
                    <tr>
                      <td>
                        <p className="para-bold">{item.name}</p>
                      </td>
                      <td>
                        <p>{item.quantity}</p>
                      </td>
                      <td>
                        <p>£ {formatCost(item.price)}</p>
                      </td>
                      <td>
                        <p className="para-bold">£ {formatCost(item.total)}</p>
                      </td>
                    </tr>
                  ))}
              </table>
            </div>
            <div className="invoice-details-total">
              <p className="invoice-details-total-text"></p>
              <p>£ {formatCost(data[0].total)}</p>
            </div>
          </div>
          {formStatus === "edit" && <InvoiceForm invoice={data[0]} />}
          {deleteModal && <DeleteModal id={data[0].id} />}
        </div>
      )}
    </div>
  );
}
