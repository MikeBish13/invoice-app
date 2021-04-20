import React, { useState } from "react";
import { useStore } from "../store";
import { deleteInvoice } from "../Api/ApiCalls";
import { useMutation, useQueryClient } from "react-query";
import { Redirect } from "react-router-dom";

export default function DeleteModal({ id }) {
  const { setDeleteModal } = useStore();
  const [redirect, setRedirect] = useState(false);
  const queryClient = useQueryClient();

  const mutation = useMutation(deleteInvoice, {
    onSuccess: () => {
      queryClient.invalidateQueries("invoices");
      setRedirect(true);
      setDeleteModal(false);
    },
  });

  return (
    <div className="delete-modal-container">
      <div className="delete-modal">
        <h3>Confirm Deletion</h3>
        <p>
          Are you sure you want to delete invoice #{id}? This action cannot be
          undone
        </p>
        <div className="delete-buttons">
          <button
            className="btn btn-four"
            onClick={() => setDeleteModal(false)}
          >
            Cancel
          </button>
          <button className="btn btn-three" onClick={() => mutation.mutate(id)}>
            Delete
          </button>
        </div>
      </div>
      {redirect && <Redirect to="/" />}
    </div>
  );
}
