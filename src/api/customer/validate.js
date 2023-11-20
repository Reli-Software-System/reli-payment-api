const Joi = require("joi");

const customerSchema = Joi.object({
	firstName: Joi.string().required(),
	lastName: Joi.string().required(),
	email: Joi.string().required(),
});

const validateCustomer = (body) => {
	const { error } = customerSchema.validate(body);
	if (error) {
		return { error: error.details[0].message };
	}
	return { error };
};

module.exports = {
	validateCustomer,
};
