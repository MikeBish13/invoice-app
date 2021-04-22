import React from "react";
import { useStore } from "../store";
import { useForm, useFieldArray } from "react-hook-form";
import { formatData } from "../helpers/FormHelpers";
import daysjs from "dayjs";
import { useMutation, useQueryClient } from "react-query";
import { addInvoice, editInvoice } from "../Api/ApiCalls";
import PlusIcon from "../images/icon-plus.svg";
import BackArrow from "../images/icon-arrow-left.svg";

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

  const queryClient = useQueryClient();

  const addMutation = useMutation(addInvoice, {
    onSuccess: () => queryClient.invalidateQueries("invoices"),
  });
  const editMutation = useMutation(editInvoice, {
    onSuccess: () => queryClient.invalidateQueries("invoice"),
  });

  // Edit or post new invoice using onSubmit, so all fields must be populated
  const submitData = (data) => {
    if (formStatus === "edit") {
      // Edit invoice mode, update existing invoice with PUT request
      let editData = formatData(data, "edit");
      editMutation.mutate(editData);
    } else {
      // New invoice mode, add a new invoice using a POST request
      let newData = formatData(data, "new");
      addMutation.mutate(newData);
    }
    setFormStatus("");
  };

  // Add new invoice in draft mode, so no need for validation
  const submitDraft = () => {
    // Add invoice but in draft mode, add a new invoice using a POST request
    let draftData = formatData(watch(), "draft");
    addMutation.mutate(draftData);
    setFormStatus("");
  };


  return (
    <div className="invoice-form-container">
      <div className="invoice-form">
        <button
          className="btn-back invoice-form-back-button"
          onClick={() => setFormStatus("")}
        >
          <img src={BackArrow} alt="back arrow"></img>
          <p>Go Back</p>
        </button>
        {formStatus === "edit" ? (
          <h2>
            Edit <span>#</span>
            {invoice.id}
          </h2>
        ) : (
          <h2>New Invoice</h2>
        )}
        <form onSubmit={handleSubmit(submitData)}>
          <p className="para-bold bill-from">Bill From</p>
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
          <div className="input-field invoice-form-sender-address-street">
            <label htmlFor="senderAddressStreet" className={errors.senderAddressStreet && "label-error"}>Street Address</label>
            <input type="text"
              name="senderAddressStreet"
              className={errors.senderAddressStreet && "input-error"}
              ref={register({ required: true })}
            />
            {errors.senderAddressStreet && (
              <span className="error-message">can't be empty</span>
            )}
          </div>
          <div className="input-field invoice-form-sender-address-city">
            <label htmlFor="senderAddressCity" className={errors.senderAddressCity && "label-error"}>City</label>
            <input type="text"
              name="senderAddressCity"
              className={errors.senderAddressCity && "input-error"}
              ref={register({ required: true })}
            ></input>
            {errors.senderAddressCity && (
              <span className="error-message">can't be empty</span>
            )}
          </div>
          <div className="input-field invoice-form-sender-address-post-code">
            <label htmlFor="senderAddressPostcode" className={errors.senderAddressPostcode && "label-error"}>Post Code</label>
            <input type="text"
              name="senderAddressPostcode"
              className={errors.senderAddressPostcode && "input-error"}
              ref={register({ required: true })}
            ></input>
            {errors.senderAddressPostcode && (
              <span className="error-message">can't be empty</span>
            )}
          </div>
          <div className="input-field invoice-form-sender-address-country">
            <label htmlFor="senderAddressCountry" className={errors.senderAddressCountry && "label-error"}>Country</label>
            <input type="text"
              name="senderAddressCountry"
              className={errors.senderAddressCountry && "input-error"}
              ref={register({ required: true })}
            ></input>
            {errors.senderAddressCountry && (
              <span className="error-message">can't be empty</span>
            )}
          </div>
          <p className="para-bold bill-to">Bill To</p>
          <div className="input-field invoice-form-client-name">
            <label htmlFor="clientName" className={errors.clientName && "label-error"}>Client's Name</label>
            <input type="text"
              name="clientName"
              className={errors.clientName && "input-error"}
              ref={register({ required: true })}
            ></input>
            {errors.clientName && (
              <span className="error-message">can't be empty</span>
            )}
          </div>
          <div className="input-field invoice-form-client-email">
            <label htmlFor="clientEmail" className={errors.clientEmail && "label-error"}>Client's Email</label>
            <input
              type="email"
              name="clientEmail"
              className={errors.clientEmail && "input-error"}
              ref={register({ required: true })}
              placeholder="email@example.com"
            ></input>
            {errors.clientEmail && (
              <span className="error-message">can't be empty</span>
            )}
          </div>
          <div className="input-field invoice-form-client-address-street">
            <label htmlFor="clientAddressStreet" className={errors.clientAddressStreet && "label-error"}>Street Address</label>
            <input type="text"
              name="clientAddressStreet"
              className={errors.clientAddressStreet && "input-error"}
              ref={register({ required: true })}
            ></input>
            {errors.clientAddressStreet && (
              <span className="error-message">can't be empty</span>
            )}
          </div>
          <div className="input-field invoice-form-client-address-city">
            <label htmlFor="clientAddressCity" className={errors.clientAddressCity && "label-error"}>City</label>
            <input type="text"
              name="clientAddressCity"
              className={errors.clientAddressCity && "input-error"}
              ref={register({ required: true })}
            ></input>
            {errors.clientAddressCity && (
              <span className="error-message">can't be empty</span>
            )}
          </div>
          <div className="input-field invoice-form-client-address-post-code">
            <label htmlFor="clientAddressPostcode" className={errors.clientAddressPostcode && "label-error"}>Post Code</label>
            <input type="text"
              name="clientAddressPostcode"
              className={errors.clientAddressPostcode && "input-error"}
              ref={register({ required: true })}
            ></input>
            {errors.clientAddressPostcode && (
              <span className="error-message">can't be empty</span>
            )}
          </div>
          <div className="input-field invoice-form-client-address-country">
            <label htmlFor="clientAddressCountry" className={errors.clientAddressCountry && "label-error"}>Country</label>
            <input type="text"
              name="clientAddressCountry"
              className={errors.clientAddressCountry && "input-error"}
              ref={register({ required: true })}
            ></input>
            {errors.clientAddressCountry && (
              <span className="error-message">can't be empty</span>
            )}
          </div>
          <div className="input-field invoice-form-invoice-date">
            <label htmlFor="invoiceDate" className={errors.invoiceDate && "label-error"}>Invoice Date</label>
            <input
              name="invoiceDate"
              className={errors.invoiceDate && "input-error"}
              type="date"
              ref={register({ required: true })}
            ></input>
            {errors.invoiceDate && (
              <span className="error-message">can't be empty</span>
            )}
          </div>
          <div className="input-field invoice-form-payment-terms">
            <label htmlFor="paymentTerms">Payment Terms</label>
            <select name="paymentTerms" ref={register}>
              <option value="1">Net 1 Day</option>
              <option value="7">Net 7 Days</option>
              <option value="14">Net 14 Days</option>
              <option value="30">Net 30 Days</option>
            </select>
            {errors.paymentTerms && (
              <span className="error-message">can't be empty</span>
            )}
          </div>
          <div className="input-field invoice-form-product-description">
            <label htmlFor="productDescription" className={errors.productDescription && "label-error"}>Product Description</label>
            <input
              type="text"
              name="productDescription"
              className={errors.productDescription && "input-error"}
              ref={register({ required: true })}
              placeholder="e.g. Graphic Design Service"
            ></input>
            {errors.productDescription && (
              <span className="error-message">can't be empty</span>
            )}
          </div>
          <h3 className="invoice-form-item-list-head">Item List</h3>
          <div className="invoice-form-items">
            {fields.map((item, index) => (
              <div key={item.id} className="invoice-form-item">
                <div className="input-field invoice-form-item-name">
                  <label htmlFor={`items[${index}].name`}>Item Name</label>
                  <input
                    type="text"
                    name={`items[${index}].name`}
                    defaultValue={`${item.name}`}
                    ref={register({ required: true })}
                    className={errors.items?.[index]?.name && 'input-error'}
                  ></input>
                </div>
                <div className="input-field invoice-form-item-quantity">
                  <label htmlFor={`items[${index}].quantity`}>Qty.</label>
                  <input
                    type="number"
                    min="0"
                    step="1"
                    name={`items[${index}].quantity`}
                    defaultValue={`${item.quantity}`}
                    ref={register({ required: true })}
                    className={errors.items?.[index]?.quantity && 'input-error'}
                    onChange={(e) =>
                      setValue(
                        `items[${index}].total`,
                        document.querySelector(
                          `input[name=items\\[${index}\\]\\.price]`
                        ).value * e.target.value
                      )
                    }
                  ></input>
                </div>
                <div className="input-field invoice-form-item-price">
                  <label htmlFor={`items[${index}].price`}>Price</label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    name={`items[${index}].price`}
                    defaultValue={`${item.price}`}
                    ref={register({ required: true })}
                    className={errors.items?.[index]?.price && 'input-error'}
                    onChange={(e) =>
                      setValue(
                        `items[${index}].total`,
                        document.querySelector(
                          `input[name=items\\[${index}\\]\\.quantity]`
                        ).value * e.target.value
                      )
                    }
                  ></input>
                </div>
                <div className="invoice-form-item-total">
                  <label htmlFor={`items[${index}].total`}>Total</label>
                  <input
                    type="number"
                    readOnly={true}
                    ref={register()}
                    name={`items[${index}].total`}
                    defaultValue={item.total}
                  ></input>
                </div>
                <svg
                  onClick={() => remove(index)}
                  className="deleteButton invoice-form-item-delete"
                  width="13"
                  height="16"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.583 3.556v10.666c0 .982-.795 1.778-1.777 1.778H2.694a1.777 1.777 0 01-1.777-1.778V3.556h10.666zM8.473 0l.888.889h3.111v1.778H.028V.889h3.11L4.029 0h4.444z"
                    fill="#888EB0"
                    fill-rule="nonzero"
                  />
                </svg>
              </div>
            ))}
            <button
              className="btn btn-six add-btn"
              type="button"
              onClick={() =>
                append({ name: "", quanity: "", price: "", total: "" })
              }
            >
              <img src={PlusIcon} alt="plus icon"></img>Add New Item
            </button>
            {Object.keys(errors).length > 0 && <span className="error-message-bottom">-All fields must be added</span>}
          </div>
          {formStatus === "edit" && (
            <div className="invoice-form-buttons">
              <button
                className="btn btn-four edit-discard-btn"
                type="button"
                onClick={() => setFormStatus("")}
              >
                Cancel
              </button>
              <button className="btn btn-two edit-save-btn" type="submit">
                Save Changes
              </button>
            </div>
          )}
          {formStatus === "add" && (
            <div className="invoice-form-buttons">
              <button
                className="btn btn-four add-discard-btn"
                type="button"
                onClick={() => setFormStatus("")}
              >
                Discard
              </button>
              <button
                className="btn btn-five add-draft-btn"
                onClick={() => submitDraft()}
                type="button"
              >
                Save as Draft
              </button>
              <button className="btn btn-two add-save-btn" type="submit">
                Save & Send
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
