const { validatePaymentIntent } = require("./validate");

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const createSetupIntent = async (req, res) => {
	try {
		const { customerId } = req.body;
		if (!customerId) {
			return res.status(400).send('"customerId" is required.');
		}

		const setupIntent = await stripe.setupIntents.create({
			customer: customerId,
			automatic_payment_methods: { enabled: true },
		});
		res.json({ client_secret: setupIntent.client_secret });
	} catch (err) {
		res.status(500).send(err.message);
	}
};

const createPaymentIntent = async (req, res) => {
	try {
		const { error } = validatePaymentIntent(req.body);
		if (error) {
			return res.status(400).send(error);
		}

		const { amount, customerId, paymentMethodId, returnUrl } = req.body;
		const paymentIntent = await stripe.paymentIntents.create({
			amount,
			currency: "usd",
			automatic_payment_methods: { enabled: true },
			customer: customerId,
			payment_method: paymentMethodId,
			return_url: returnUrl,
			off_session: true,
			confirm: true,
		});
		res.json(paymentIntent);
	} catch (err) {
		console.log("Error code is: " + err.code);
		if (err.raw.payment_intent.id) {
			const paymentIntentRetrieved = await stripe.paymentIntents.retrieve(
				err.raw.payment_intent.id
			);
			console.log("PI retrieved: " + paymentIntentRetrieved.id);
		}
		res.status(500).send(err.message);
	}
};

const listPaymentMethods = async (req, res) => {
	try {
		const { customerId } = req.params;
		const paymentMethods = await stripe.paymentMethods.list({
			customer: customerId,
			type: "card",
		});
		res.json(paymentMethods);
	} catch (err) {
		res.status(500).send(err.message);
	}
};

module.exports = {
	createSetupIntent,
	createPaymentIntent,
	listPaymentMethods,
};
