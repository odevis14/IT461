export default {
  seedOrders: [
    {
      order_id: 1001,
      customer: "John Smith",
      phone: "617-555-1001",
      status: "Received",
      dropoff: "2026-03-16",
      pickup: "2026-03-18",
      total: 18,
      paid: false,
      item_summary: "2 shirts, 1 pants",
      notes: "Light starch"
    },
    {
      order_id: 1002,
      customer: "Sarah Lee",
      phone: "617-555-1002",
      status: "Cleaning",
      dropoff: "2026-03-15",
      pickup: "2026-03-17",
      total: 25,
      paid: true,
      item_summary: "3 blouses, 1 skirt",
      notes: "Delicate fabric"
    }
  ],

  currentOrders() {
    return [...(appsmith.store.orders || this.seedOrders)];
  },

  async addOrder(formData) {
    if (!formData || !formData.customer || !formData.customer.trim()) {
      showAlert("Enter a customer name first", "warning");
      return;
    }

    const orders = this.currentOrders();
    const nextId =
      orders.length > 0
        ? Math.max(...orders.map(o => Number(o.order_id) || 0)) + 1
        : 1001;

    const newOrder = {
      order_id: nextId,
      customer: formData.customer.trim(),
      phone: formData.phone || "",
      status: formData.status || "Received",
      dropoff: formData.dropoff || "",
      pickup: formData.pickup || "",
      total: Number(String(formData.total || "").replace(/[^0-9.-]/g, "")) || 0,
      paid: !!formData.paid,
      item_summary: formData.item_summary || "",
      notes: formData.notes || ""
    };

    await storeValue("orders", [newOrder, ...orders]);
    showAlert("Order added", "success");
    navigateTo("Dashboard", {}, "SAME_WINDOW");
  },

  async Button1onClick() {
    return await this.addOrder({
      customer: Input1.text,
      phone: Input2.text,
      status: Select1.selectedOptionValue,
      dropoff: DatePicker1.selectedDate,
      pickup: DatePicker2.selectedDate,
      total: Input3.text,
      paid: Checkbox1.isChecked,
      item_summary: Input4.text,
      notes: Input5.text
    });
  },

  async updateSelectedStatus(newStatus) {
    const selected = tblOrders.selectedRow;

    if (!selected || !selected.order_id) {
      showAlert("Select an order row first", "warning");
      return;
    }

    if (!newStatus) {
      showAlert("Choose a status first", "warning");
      return;
    }

    const updated = this.currentOrders().map(order =>
      Number(order.order_id) === Number(selected.order_id)
        ? {
            ...order,
            status: newStatus,
            paid: newStatus === "Completed" ? true : order.paid
          }
        : order
    );

    await storeValue("orders", updated);
    showAlert(`Order #${selected.order_id} set to ${newStatus}`, "success");
  },

  async Select2onOptionChange() {
    return await this.updateSelectedStatus(Select2.selectedOptionValue);
  }
}