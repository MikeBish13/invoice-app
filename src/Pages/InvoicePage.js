import React from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { Link } from "react-router-dom";
import { useStore } from "../store";
import InvoiceForm from "../components/InvoiceForm";
import { fetchInvoice, setPaidInvoice } from "../Api/ApiCalls";
import DeleteModal from "../components/DeleteModal";
import { formatCost } from "../helpers/FormHelpers";

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
    <>
      {status === "error" && <p>This invoice does not exist</p>}
      {status === "loading" && <p>Fetching invoice.....</p>}
      {status === "success" && (
        <>
          <Link to="/">Go Back</Link>
          <div>
            <div>
              <p>
                Status - <strong>{data[0].status}</strong>
              </p>
              <button onClick={() => setFormStatus("edit")}>Edit</button>
              <button onClick={() => setDeleteModal(true)}>Delete</button>
              <button onClick={() => paidMutation.mutate(data[0].id)}>
                Mark as paid
              </button>
            </div>
            <h2>#{data[0].id}</h2>
            <p>{data[0].description}</p>
            <br></br>
            <p>{data[0].senderAddress.street}</p>
            <p>{data[0].senderAddress.city}</p>
            <p>{data[0].senderAddress.postCode}</p>
            <p>{data[0].senderAddress.country}</p>
            <h3>Invoice Date</h3>
            <p>{data[0].createdAt}</p>
            <h3>Payment Due</h3>
            <p>{data[0].paymentDue}</p>
            <h3>Bill To</h3>
            <p>{data[0].clientName}</p>
            <p>{data[0].clientAddress.street}</p>
            <p>{data[0].clientAddress.city}</p>
            <p>{data[0].clientAddress.postCode}</p>
            <p>{data[0].clientAddress.country}</p>
            <h3>Sent To</h3>
            <p>{data[0].clientEmail}</p>
            <br></br>
            {data[0].items &&
              data[0].items.map((item) => (
                <div key={item.id}>
                  <p>{item.name}</p>
                  <p>
                    {item.quantity} x £{formatCost(item.price)}
                  </p>
                  <p>
                    <strong>£{formatCost(item.total)}</strong>
                  </p>
                </div>
              ))}
            <h2>£{formatCost(data[0].total)}</h2>
          </div>
          {formStatus === "edit" && <InvoiceForm invoice={data[0]} />}
          {deleteModal && <DeleteModal id={data[0].id} />}
        </>
      )}
    </>
  );
}
