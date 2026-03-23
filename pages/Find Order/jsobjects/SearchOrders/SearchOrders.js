export default {
  searchOrders() {
    const orders =
      appsmith.store.orders || [];

    return orders.filter(order => {
      return (
        (!Input1.text ||
          String(order.order_id).includes(Input1.text)) &&

        (!Input2.text ||
          order.customer.toLowerCase()
          .includes(Input2.text.toLowerCase())) &&

        (!Input3.text ||
          order.phone.includes(Input3.text))
      );
    });
  }
}
