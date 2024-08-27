const { v4: uuidv4 } = require("uuid");
const express = require("express");
const { receiptSchema, idSchema } = require("./schemas.js");
const { calculatePointsValue } = require("./helpers.js");
const { addToDatabase, getFromDatabase } = require("./database.js");
const app = express();
app.use(express.json());

// Custom error handling for invalid JSON - 400 Bad Request
app.use((err, req, res, next) => {
	if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
		// If the error is a SyntaxError due to invalid JSON
		return res.status(400).json({ message: "Inputs must be JSON format." });
	}
	next(); // Pass to the next middleware if the error is not related to JSON parsing
});

/*
    Get request to get reciept points.
    Input parameter schema ID in URL

    Response status 200 & points value if successful, 400 if invalid reciept id.
*/

app.get("/receipts/:id/points", (req, res) => {
	const { id } = req.params;
	const { error } = idSchema.validate(id);

	if (error || !getFromDatabase(id)) {
		return res.status(400).send("No receipt found for that id");
	}

	return res.status(200).send({ points: getFromDatabase(id) });
});

/*
    POST request to process reciept.
    Input parameter schema RECIEPT in body

    Response status 200 & reciept ID if successful, 400 if invalid reciept params.
*/
app.post("/receipts/process", async (req, res) => {
	const { error } = receiptSchema.validate(req.body);

	if (error) {
		return res.status(400).send("The receipt is invalid");
	}

	const awardedPoints = await calculatePointsValue(req.body);

	const recieptID = uuidv4();

	addToDatabase(recieptID, awardedPoints);

	return res.status(200).send({ id: recieptID });
});

var server = app.listen(3000);

module.exports = { app, server };
