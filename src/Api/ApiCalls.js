export const fetchData = async () => {
  const res = await fetch("http://localhost:3004/invoices");
  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }
  return res.json();
};

export const fetchInvoice = async (id) => {
  const res = await fetch(`http://localhost:3004/invoices?id=${id}`);
  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }
  return res.json();
};

export const addInvoice = async (data) => {
  await fetch("http://localhost:3004/invoices", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

export const editInvoice = async (data) => {
  await fetch(`http://localhost:3004/invoices/${data.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

export const deleteInvoice = async (id) => {
  await fetch(`http://localhost:3004/invoices/${id}`, {
    method: "DELETE",
  });
};

export const setPaidInvoice = async (id) => {
  await fetch(`http://localhost:3004/invoices/${id}`, {
      method: "PATCH",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify({status: "paid"})
  });
};
