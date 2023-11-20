const {
	createCustomer,
	getCustomer,
	getCustomers,
	updateCustomer,
	deleteCustomer,
} = require("./controller");

const router = require("express").Router();

router.get("/", getCustomers);
router.get("/:customerId", getCustomer);
router.post("/", createCustomer);
router.put("/:customerId", updateCustomer);
router.delete("/:customerId", deleteCustomer);

module.exports = router;
