export const fetchData = async () => {
  const res = await fetch("http://localhost:3004/invoices");
  return res.json();
};

export const fetchInvoice = async (id) => {
  const res = await fetch(`http://localhost:3004/invoices?id=${id}`);
  return res.json();
};

export const addInvoice = (data) => {
  fetch("http://localhost:3004/invoices", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

export const editInvoice = (data) => {
  fetch(`http://localhost:3004/invoices/${data.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

export const deleteInvoice = (id) => {
  fetch(`http://localhost:3004/invoices/${id}`, {
    method: "DELETE",
  });
};

export const setPaidInvoice = (id) => {
  console.log("invoice: " + id);
};
