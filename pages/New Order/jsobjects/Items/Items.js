export default {

addItem() {

if (!ItemDropdown.selectedOptionLabel) {

showAlert(
"Select an item",
"warning"
);

return;

}

if (!ItemQuantity.text) {

showAlert(
"Enter quantity",
"warning"
);

return;

}

// Get existing summary

let current =
appsmith.store.itemSummary || "";

// Create new item text

let newItem =
`${ItemQuantity.text} ${ItemDropdown.selectedOptionLabel}`;

// Combine text

let updated =
current
? `${current}, ${newItem}`
: newItem;

// Save updated summary

storeValue(
"itemSummary",
updated
);

// Clear dropdown + quantity

resetWidget("ItemDropdown");

resetWidget("ItemQuantity");

}

}