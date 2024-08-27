// Import Joi
const Joi = require("joi");

// Define the item schema
const itemSchema = Joi.object({
	shortDescription: Joi.string()
		.pattern(/^[\w\s\-]+$/)
		.required(),

	price: Joi.string()
		.pattern(/^\d+\.\d{2}$/)
		.required(),
});

// Define the receipt schema
const receiptSchema = Joi.object({
	retailer: Joi.string()
		.pattern(/^[\w\s\-&]+$/)
		.required(),

	purchaseDate: Joi.date().required(),

	purchaseTime: Joi.string()
		.pattern(/^([01]\d|2[0-3]):([0-5]\d)$/)
		.required(),

	items: Joi.array().items(itemSchema).min(1).required(),

	total: Joi.string()
		.pattern(/^\d+\.\d{2}$/)
		.required(),
});

const idSchema = Joi.string().pattern(/^\S+$/);
// Export the schemas
module.exports = {
	receiptSchema,
	idSchema,
};
