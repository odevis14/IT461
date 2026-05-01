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
      notes: "Light starch",
      items: [
        {
          sku: "SHIRT",
          item: "Shirt",
          service: "Wash & Press",
          quantity: 2,
          unit_price: 3.50,
          line_total: 7.00
        },
        {
          sku: "PANTS",
          item: "Pants",
          service: "Dry Clean",
          quantity: 1,
          unit_price: 11.00,
          line_total: 11.00
        }
      ]
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
      notes: "Delicate fabric",
      items: [
        {
          sku: "BLOUSE",
          item: "Blouse",
          service: "Dry Clean",
          quantity: 3,
          unit_price: 6.00,
          line_total: 18.00
        },
        {
          sku: "SKIRT",
          item: "Skirt",
          service: "Dry Clean",
          quantity: 1,
          unit_price: 7.00,
          line_total: 7.00
        }
      ]
    }
  ],

  currentOrders() {
    return Array.isArray(appsmith.store.orders)
      ? appsmith.store.orders
      : this.seedOrders;
  },

  async Button1onClick() {
    const customer = String(Input1.text || "").trim();
    const phone = String(Input2.text || "").trim();
    const cart = Items.rawCart();

    if (!customer) {
      showAlert("Enter customer name", "warning");
      return;
    }

    if (!phone) {
      showAlert("Enter phone number", "warning");
      return;
    }

    if (!cart.length) {
      showAlert("Add at least one priced item", "warning");
      return;
    }

    const orders = this.currentOrders();

    const nextId =
      orders.length > 0
        ? Math.max(...orders.map(order => Number(order.order_id) || 0)) + 1
        : 1001;

    const newOrder = {
      order_id: nextId,
      customer,
      phone,
      status: Select1.selectedOptionValue || "Received",
      dropoff: DatePicker1.selectedDate || "",
      pickup: DatePicker2.selectedDate || "",
      total: Items.totalNumber(),
      paid: !!Checkbox1.isChecked,
      item_summary: Items.itemSummary(),
      notes: String(Input5.text || "").trim(),
      items: cart
    };

    await storeValue("orders", [newOrder, ...orders]);
    await storeValue("selectedOrderId", nextId);
    await storeValue("cartItems", []);

    showAlert(`Order #${nextId} saved with automatic pricing`, "success");

    await resetWidget("Input1");
    await resetWidget("Input2");
    await resetWidget("Input3");
    await resetWidget("Input4");
    await resetWidget("Input5");
    await resetWidget("Checkbox1");
    await resetWidget("ItemDropdown");
    await resetWidget("ItemQuantity");

    navigateTo("Dashboard", {}, "SAME_WINDOW");
  }
}