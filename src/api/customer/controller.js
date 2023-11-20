const { validateCustomer } = require("./validate");

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const createCustomer = async (req, res) => {
	try {
		const { error } = validateCustomer(req.body);
		if (error) {
			return res.status(400).send(error);
		}

		const { email, firstName, lastName } = req.body;
		const customer = await stripe.customers.create({
			email,
			name: `${firstName} ${lastName}`,
			metadata: {
				firstName,
				lastName,
				// additional cusomter info you want to save
			},
		});

		res.json(customer);
	} catch (err) {
		res.status(500).send(err.message);
	}
};

const getCustomer = async (req, res) => {
	try {
		const { customerId } = req.params;
		const customer = await stripe.customers.retrieve(customerId);
		res.json(customer);
	} catch (err) {
		res.status(500).send(err.message);
	}
};

const getCustomers = async (req, res) => {
	try {
		const customers = await stripe.customers.list(req.params);
		res.json(customers);
	} catch (err) {
		res.status(500).send(err.message);
	}
};

const updateCustomer = async (req, res) => {
	try {
		const { customerId } = req.params;
		const customer = await stripe.customers.update(customerId, req.body);
		res.json(customer);
	} catch (err) {
		res.status(500).send(err.message);
	}
};

const deleteCustomer = async (req, res) => {
	try {
		const { customerId } = req.params;
		const deleted = await stripe.customers.del(customerId);
		res.json(deleted);
	} catch (err) {
		res.status(500).send(err.message);
	}
};

module.exports = {
	createCustomer,
	getCustomer,
	getCustomers,
	updateCustomer,
	deleteCustomer,
};
