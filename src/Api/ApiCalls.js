const API_URL = "https://my-invoice-server.herokuapp.com/invoices";

export const fetchData = async () => {
  const res = await fetch(API_URL);
  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }
  return res.json();
};

export const fetchInvoice = async (id) => {
  const res = await fetch(`${API_URL}?id=${id}`);
  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }
  return res.json();
};

export const addInvoice = async (data) => {
  await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

export const editInvoice = async (data) => {
  await fetch(`${API_URL}/${data.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

export const deleteInvoice = async (id) => {
  await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
};

export const setPaidInvoice = async (id) => {
  await fetch(`${API_URL}/${id}`, {
      method: "PATCH",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify({status: "paid"})
  });
};
