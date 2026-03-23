export default {
  // Starter demo data so the dashboard is not empty when the app first opens.
  // If there is nothing saved yet, the app falls back to these example orders.
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

  // Pull the current saved orders from Appsmith storage.
  // If nothing has been saved yet, use the demo seed data above.
  currentOrders() {
    return [...(appsmith.store.orders || this.seedOrders)];
  },

  // Main function for creating a new order from the New Order page form.
  async addOrder(formData) {
    // Basic validation so we do not create an order with no customer name.
    if (!formData || !formData.customer || !formData.customer.trim()) {
      showAlert("Enter a customer name first", "warning");
      return;
    }

    // Get the latest current list of orders.
    const orders = this.currentOrders();

    // Generate the next order ID by looking at the highest current one.
    // If there are no orders yet, start at 1001.
    const nextId =
      orders.length > 0
        ? Math.max(...orders.map(o => Number(o.order_id) || 0)) + 1
        : 1001;

    // Build the new order object from the form inputs.
    // Also clean up the total so symbols like $ do not break the number.
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

    // Save the new order at the top of the list so it shows up first on the dashboard.
    await storeValue("orders", [newOrder, ...orders]);

    // Let the user know it worked.
    showAlert("Order added", "success");

    // Send them back to the dashboard after saving.
    navigateTo("Dashboard", {}, "SAME_WINDOW");
  },

  // This is the function the Save Order button actually calls.
  // It grabs values from the page widgets and passes them into addOrder().
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
  }
}