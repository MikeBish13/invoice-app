import React from "react";
import { useStore } from "../store";
import { useForm, useFieldArray } from "react-hook-form";
import TrashCan from "../images/icon-delete.svg";
import { formatData } from "../helpers/FormHelpers";
import daysjs from "dayjs";
import {useMutation, QueryClient} from 'react-query'
import {addInvoice, editInvoice} from '../Api/ApiCalls'



export default function InvoiceForm({ invoice }) {
  const { formStatus, setFormStatus } = useStore();
  const { register, handleSubmit, errors, control, setValue, watch } = useForm({
    defaultValues: {
      senderAddressStreet:
        formStatus === "edit" ? invoice.senderAddress.street : "",
      senderAddressCity:
        formStatus === "edit" ? invoice.senderAddress.city : "",
      senderAddressPostcode:
        formStatus === "edit" ? invoice.senderAddress.postCode : "",
      senderAddressCountry:
        formStatus === "edit" ? invoice.senderAddress.country : "",
      clientName: formStatus === "edit" ? invoice.clientName : "",
      clientEmail: formStatus === "edit" ? invoice.clientEmail : "",
      clientAddressStreet:
        formStatus === "edit" ? invoice.clientAddress.street : "",
      clientAddressCity:
        formStatus === "edit" ? invoice.clientAddress.city : "",
      clientAddressPostcode:
        formStatus === "edit" ? invoice.clientAddress.postCode : "",
      clientAddressCountry:
        formStatus === "edit" ? invoice.clientAddress.country : "",
      invoiceDate:
        formStatus === "edit"
          ? invoice.createdAt
          : daysjs().format("YYYY-MM-DD"),
      paymentTerms: formStatus === "edit" ? invoice.paymentTerms : 1,
      productDescription: formStatus === "edit" ? invoice.description : "",
      items: formStatus === "edit" ? invoice.items : [],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });
  const queryClient = new QueryClient();
  const addMutation = useMutation(addInvoice, {
    onSuccess: () => queryClient.invalidateQueries('invoices')
  });
  const editMutation = useMutation(editInvoice, {
    onSuccess: (invoice) => queryClient.invalidateQueries(['invoice', invoice.id])
  });
  

  // Edit or post new invoice using onSubmit, so all fields must be populated
  const submitData = (data) => {
    if (formStatus === "edit") {
      // Edit invoice mode, update existing invoice with PUT request
      let editData = formatData(data, 'edit');
      editMutation.mutate(editData);
    } else {
      // New invoice mode, add a new invoice using a POST request
      let newData = formatData(data, 'new');
      addMutation.mutate(newData);
    }
    setFormStatus('')
  };

  // Add new invoice in draft mode, so no need for validation
  const submitDraft = () => {
    // Add invoice but in draft mode, add a new invoice using a POST request
    let draftData = formatData(watch(), 'draft');
    addMutation.mutate(draftData);
    setFormStatus('')
  };

  return (
    <div className="invoice-form">
      <button onClick={() => setFormStatus("")}>Go Back</button>
      {formStatus === "edit" ? <h1>Edit #{invoice.id}</h1> : <h1>Add</h1>}
      <form onSubmit={handleSubmit(submitData)}>
        <p>
          <strong>Bill From</strong>
        </p>
        {formStatus === "edit" && (
          <input
            type="text"
            name="id"
            style={{ display: "none" }}
            ref={register()}
            defaultValue={invoice.id}
          />
        )}
        {formStatus === "edit" && (
          <input
            type="text"
            name="status"
            style={{ display: "none" }}
            ref={register()}
            defaultValue={invoice.status}
          />
        )}
        <div>
          <label htmlFor="senderAddressStreet">Street Address</label>
          <input
            name="senderAddressStreet"
            ref={register({ required: "Field required" })}
          />
          <span>{errors.senderAddressStreet?.message}</span>
        </div>
        <div>
          <label htmlFor="senderAddressCity">City</label>
          <input
            name="senderAddressCity"
            ref={register({ required: true })}
          ></input>
          {errors.senderAddressCity && <span>Field Required</span>}
        </div>
        <div>
          <label htmlFor="senderAddressPostcode">Post Code</label>
          <input
            name="senderAddressPostcode"
            ref={register({ required: true })}
          ></input>
          {errors.senderAddressPostcode && <span>Field Required</span>}
        </div>
        <div>
          <label htmlFor="senderAddressCountry">Country</label>
          <input
            name="senderAddressCountry"
            ref={register({ required: true })}
          ></input>
          {errors.senderAddressCountry && <span>Field Required</span>}
        </div>
        <p>
          <strong>Bill To</strong>
        </p>
        <div>
          <label htmlFor="clientName">Client's Name</label>
          <input name="clientName" ref={register({ required: true })}></input>
          {errors.clientName && <span>Field Required</span>}
        </div>
        <div>
          <label htmlFor="clientEmail">Client's Email</label>
          <input
            type="email"
            name="clientEmail"
            ref={register({ required: true })}
            placeholder="email@example.com"
          ></input>
          {errors.clientEmail && <span>Field Required</span>}
        </div>
        <div>
          <label htmlFor="clientAddressStreet">Street Address</label>
          <input
            name="clientAddressStreet"
            ref={register({ required: true })}
          ></input>
          {errors.clientAddressStreet && <span>Field Required</span>}
        </div>
        <div>
          <label htmlFor="clientAddressCity">City</label>
          <input
            name="clientAddressCity"
            ref={register({ required: true })}
          ></input>
          {errors.clientAddressCity && <span>Field Required</span>}
        </div>
        <div>
          <label htmlFor="clientAddressPostcode">Post Code</label>
          <input
            name="clientAddressPostcode"
            ref={register({ required: true })}
          ></input>
          {errors.clientPostcode && <span>Field Required</span>}
        </div>
        <div>
          <label htmlFor="clientAddressCountry">Country</label>
          <input
            name="clientAddressCountry"
            ref={register({ required: true })}
          ></input>
          {errors.clientAddressCountry && <span>Field Required</span>}
        </div>
        <div>
          <label htmlFor="invoiceDate">Invoice Date</label>
          <input
            name="invoiceDate"
            type="date"
            ref={register({ required: true })}
          ></input>
          {errors.invoiceDate && <span>Field Required</span>}
        </div>
        <div>
          <label htmlFor="paymentTerms">Payment Terms</label>
          <select name="paymentTerms" ref={register}>
            <option value="1">Net 1 Day</option>
            <option value="7">Net 7 Days</option>
            <option value="14">Net 14 Days</option>
            <option value="30">Net 30 Days</option>
          </select>
          {errors.senderAddressStreet && <span>Field Required</span>}
        </div>
        <div>
          <label htmlFor="productDescription">Product Description</label>
          <input
            type="text"
            name="productDescription"
            ref={register({ required: true })}
            placeholder="e.g. Graphic Design Service"
          ></input>
          {errors.productDescription && <span>Field Required</span>}
        </div>
        <h3>Item List</h3>
        <div className="invoice-form-items">
          {fields.map((item, index) => (
            <div key={item.id} className="invoice-form-item">
              <div>
                <label htmlFor={`items[${index}].name`}>Item Name</label>
                <input
                  type="text"
                  name={`items[${index}].name`}
                  defaultValue={`${item.name}`}
                  ref={register({ required: true })}
                ></input>
                {errors.itemName && <span>Field Required</span>}
              </div>
              <div>
                <label htmlFor={`items[${index}].quantity`}>Qty</label>
                <input
                  type="number"
                  min="0"
                  step="1"
                  name={`items[${index}].quantity`}
                  defaultValue={`${item.quantity}`}
                  ref={register({ required: true })}
                  onChange={(e) =>
                    setValue(
                      `items[${index}].total`,
                      document.querySelector(
                        `input[name=items\\[${index}\\]\\.price]`
                      ).value * e.target.value
                    )
                  }
                ></input>
                {errors.itemName && <span>Field Required</span>}
              </div>
              <div>
                <label htmlFor={`items[${index}].price`}>Price</label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  name={`items[${index}].price`}
                  defaultValue={`${item.price}`}
                  ref={register({ required: true })}
                  onChange={(e) =>
                    setValue(
                      `items[${index}].total`,
                      document.querySelector(
                        `input[name=items\\[${index}\\]\\.quantity]`
                      ).value * e.target.value
                    )
                  }
                ></input>
                {errors.itemName && <span>Field Required</span>}
              </div>
              <div>
                <label htmlFor={`items[${index}].total`}>Total</label>
                <input
                  type="text"
                  readOnly={true}
                  ref={register()}
                  name={`items[${index}].total`}
                  defaultValue={item.total}
                ></input>
              </div>
              <img
                onClick={() => remove(index)}
                className="deleteButton"
                src={TrashCan}
                alt="trash can"
              ></img>
            </div>
          ))}
          <button
            type="button"
            onClick={() =>
              append({ name: "", quanity: "", price: "", total: "" })
            }
          >
            Add
          </button>
        </div>
        {formStatus === "edit" && (
          <div className="form-buttons">
            <button type="submit">Save Changes</button>
            <button type="button" onClick={() => setFormStatus("")}>
              Cancel
            </button>
          </div>
        )}
        {formStatus === "add" && (
          <div className="form-buttons">
            <button type="submit">Save & Send</button>
            <button onClick={() => submitDraft()} type="button">
              Save as Draft
            </button>
            <button type="button" onClick={() => setFormStatus("")}>
              Discard
            </button>
          </div>
        )}
      </form>
    </div>
  );
}
