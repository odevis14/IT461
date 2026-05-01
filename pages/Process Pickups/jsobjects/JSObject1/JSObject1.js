export default {
    async handlePickup() {
 
        const orderId = Input1.text;
        const phone = PhoneInput1.text;
        const pickupDate = DatePicker1.selectedDate;

        if (!orderId || !phone) {
            return showAlert("Please enter the Order ID and Phone Number", "warning");
        }

        try {

            await save_pickup_query.run();
					
            await send_sms_api.run();

            showAlert("Pickup for Order " + orderId + " scheduled!", "success");
        } catch (error) {
            showAlert("Error processing pickup: " + error.message, "error");
        }
    }
}