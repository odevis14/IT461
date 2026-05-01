export default {
  priceCatalog: [
    {
      sku: "SHIRT",
      item: "Shirt",
      service: "Wash & Press",
      unit_price: 3.50
    },
    {
      sku: "PANTS",
      item: "Pants",
      service: "Dry Clean",
      unit_price: 11.00
    },
    {
      sku: "BLOUSE",
      item: "Blouse",
      service: "Dry Clean",
      unit_price: 6.00
    },
    {
      sku: "SKIRT",
      item: "Skirt",
      service: "Dry Clean",
      unit_price: 7.00
    },
    {
      sku: "DRESS",
      item: "Dress",
      service: "Dry Clean",
      unit_price: 16.00
    },
    {
      sku: "SUIT_2PC",
      item: "Suit - 2 Piece",
      service: "Dry Clean",
      unit_price: 22.00
    },
    {
      sku: "COAT",
      item: "Coat",
      service: "Dry Clean",
      unit_price: 24.00
    },
    {
      sku: "COMFORTER",
      item: "Comforter",
      service: "Laundry",
      unit_price: 32.00
    }
  ],

  catalogOptions() {
    return this.priceCatalog.map(item => ({
      label: `${item.item} - ${item.service} - $${item.unit_price.toFixed(2)}`,
      value: item.sku
    }));
  },

  cart() {
    return Array.isArray(appsmith.store.cartItems)
      ? appsmith.store.cartItems
      : [];
  },

  selectedCatalogItem() {
    return this.priceCatalog.find(item =>
      item.sku === ItemDropdown.selectedOptionValue
    );
  },

  async addItem() {
    const selected = this.selectedCatalogItem();
    const quantity = Number(ItemQuantity.text);

    if (!selected) {
      showAlert("Select an item from the price list", "warning");
      return;
    }

    if (!Number.isInteger(quantity) || quantity <= 0) {
      showAlert("Enter a valid quantity", "warning");
      return;
    }

    const cart = this.cart();

    const existingIndex = cart.findIndex(row => row.sku === selected.sku);

    let updatedCart;

    if (existingIndex >= 0) {
      updatedCart = cart.map((row, index) => {
        if (index !== existingIndex) return row;

        const newQuantity = Number(row.quantity) + quantity;

        return {
          ...row,
          quantity: newQuantity,
          line_total: newQuantity * Number(row.unit_price)
        };
      });
    } else {
      const newLine = {
        id: `${selected.sku}-${Date.now()}`,
        sku: selected.sku,
        item: selected.item,
        service: selected.service,
        quantity,
        unit_price: selected.unit_price,
        line_total: quantity * selected.unit_price
      };

      updatedCart = [newLine, ...cart];
    }

    await storeValue("cartItems", updatedCart);

    await resetWidget("ItemDropdown");
    await resetWidget("ItemQuantity");

    showAlert("Item added and price calculated", "success");
  },

  rawCart() {
    return this.cart().map(row => ({
      sku: row.sku,
      item: row.item,
      service: row.service,
      quantity: Number(row.quantity),
      unit_price: Number(row.unit_price),
      line_total: Number(row.line_total)
    }));
  },

  cartRows() {
    return this.cart().map(row => ({
      id: row.id,
      item: row.item,
      service: row.service,
      quantity: row.quantity,
      unit_price: `$${Number(row.unit_price).toFixed(2)}`,
      line_total: `$${Number(row.line_total).toFixed(2)}`
    }));
  },

  itemSummary() {
    return this.cart()
      .map(row => `${row.quantity} ${row.item}`)
      .join(", ");
  },

  totalNumber() {
    return this.cart().reduce(
      (sum, row) => sum + Number(row.line_total || 0),
      0
    );
  },

  totalText() {
    return `$${this.totalNumber().toFixed(2)}`;
  },

  async removeCartItem(rowId) {
    const updatedCart = this.cart().filter(row => row.id !== rowId);

    await storeValue("cartItems", updatedCart);

    showAlert("Item removed", "success");
  },

  async clearCart() {
    await storeValue("cartItems", []);
    showAlert("Cart cleared", "info");
  }
}