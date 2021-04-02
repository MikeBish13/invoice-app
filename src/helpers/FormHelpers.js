import daysjs from "dayjs";


const createId = () => {
  let ID =
    String.fromCharCode(65 + Math.floor(Math.random() * 26)) +
    String.fromCharCode(65 + Math.floor(Math.random() * 26)) +
    Math.floor(1000 + Math.random() * 9000);
  return ID;
};

const calcultateTotal = (items) => {
  if (items) {
    let totalItems = [];
    items.forEach((item) => {
      totalItems.push(parseInt(item.total));
    });
    let returnedTotal = totalItems.reduce((a, b) => {
      return a + b;
    });
    return returnedTotal;
  } else {
    return [];
  }
};

export const formatData = (data, status) => {
  let returnedData = {
    id: status !== "edit" ? createId() : data.id,
    createdAt: data.invoiceDate,
    paymentDue: daysjs(data.invoiceDate)
      .add(data.paymentTerms, "day")
      .format("YYYY-MM-DD"),
    description: data.productDescription,
    paymentTerms: data.paymentTerms,
    clientName: data.clientName,
    clientEmail: data.clientEmail,
    status:
      data.status === "draft"
        ? "pending"
        : status === "new"
        ? "pending"
        : status === "draft"
        ? "draft"
        : data.status,
    senderAddress: {
      street: data.senderAddressStreet,
      city: data.senderAddressCity,
      postCode: data.senderAddressPostcode,
      country: data.senderAddressCountry,
    },
    clientAddress: {
      street: data.clientAddressStreet,
      city: data.clientAddressCity,
      postCode: data.clientAddressPostcode,
      country: data.clientAddressCountry,
    },
    items: data.items,
    total: data.items ? calcultateTotal(data.items) : 0.00,
  };
  return returnedData;
};

export const formatCost = (cost) => {
    return parseFloat(cost).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


