export default {

addVendor() {

const vendors =
appsmith.store.vendors || [];

const newVendor = {

vendor_name:
InputVendor.text,

delivery_date:
DeliveryDate.selectedDate,

notes:
InputDetails.text

};

storeValue(
"vendors",
[newVendor, ...vendors]
);

showAlert(
"Delivery saved!"
);

}

}