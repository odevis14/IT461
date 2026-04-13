export default {

addDelivery() {

// Validation checks

if (!VendorDropdown.selectedOptionLabel) {

showAlert(
"Warning",
"Select a vendor"
);

return;

}

if (!SupplyDropdown.selectedOptionLabel) {

showAlert(
"Select a supply",
"warning"
);

return;

}

if (!SupplyQuantity.text) {

showAlert(
"Enter quantity",
"warning"
);

return;

}

// Get existing deliveries

const deliveries =
appsmith.store.deliveries || [];

// Create new delivery record

const newDelivery = {

vendor:
VendorDropdown.selectedOptionLabel,

supply:
SupplyDropdown.selectedOptionLabel,

quantity:
Number(SupplyQuantity.text),

delivery_date:
DeliveryDate.selectedDate,

details:
InputDetails.text

};

// Save updated list

storeValue(
"deliveries",
[newDelivery, ...deliveries]
);

// Success message

showAlert(
"Vendor delivery saved",
"Success!"
);
	
// Reset fields

resetWidget("VendorDropdown");

resetWidget("SupplyDropdown");

resetWidget("SupplyQuantity");

resetWidget("DeliveryDate");

resetWidget("InputDetails");

}

}