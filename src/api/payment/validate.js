const Joi = require("joi");

const paymentIntentSchema = Joi.object({
	amount: Joi.number().required(),
	customerId: Joi.string().required(),
	paymentMethodId: Joi.string().required(),
	returnUrl: Joi.string().required(),
});

const validatePaymentIntent = (body) => {
	const { error } = paymentIntentSchema.validate(body);
	if (error) {
		return { error: error.details[0].message };
	}
	return { error };
};

module.exports = {
	validatePaymentIntent,
};
