export default {
  updateStatus(newStatus) {
    const orders = appsmith.store.orders || [];
    const search = InputOrder.text;

    const updated = orders.map(order =>
      String(order.order_id) === search ||
      order.customer.toLowerCase() === search.toLowerCase()
        ? { ...order, status: newStatus }
        : order
    );

    storeValue("orders", updated);
    showAlert(`Order status updated to ${newStatus}`, "success");
  }
}