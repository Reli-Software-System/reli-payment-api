const {
	createSetupIntent,
	listPaymentMethods,
	createPaymentIntent,
} = require("./controller");

const router = require("express").Router();

router.get("/:customerId", listPaymentMethods);
router.post("/setup-intent", createSetupIntent);
router.post("/payment-intent", createPaymentIntent);

module.exports = router;
