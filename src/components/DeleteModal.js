import React, {useState} from "react";
import { useStore } from "../store";
import { deleteInvoice } from "../Api/ApiCalls";
import { useMutation, useQueryClient } from "react-query";
import { Redirect } from "react-router-dom";

export default function DeleteModal({ id }) {
  const { setDeleteModal } = useStore();
  const [redirect, setRedirect ] = useState(false);
  const queryClient = useQueryClient();

  const mutation = useMutation(deleteInvoice, {
    onSuccess: () => {
      queryClient.invalidateQueries("invoices");
      setRedirect(true);
      setDeleteModal(false);
    },
  });

  return (
    <div>
      <div className="delete-modal">
        <h1>Confirm Deletion</h1>
        <p>
          Are you sure you want to delete #{id}? This action cannot be undone
        </p>
        <button onClick={() => setDeleteModal(false)}>Cancel</button>
        <button onClick={() => mutation.mutate(id)}>Delete</button>
      </div>
      {redirect && <Redirect to="/" />}
    </div>
  );
}
