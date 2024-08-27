const { v4: uuidv4 } = require("uuid");
const express = require("express");
const { receiptSchema, idSchema } = require("./schemas.js");

const app = express();
app.use(express.json());

const PORT = 3000;

recieptDatabase = {};
// Use dictionary for memory store since temporary

app.get("/receipts/:id/points", (req, res) => {
	// pull the ID from our database
	const { id } = req.params;
	const { error } = idSchema.validate(id);

	// Always do validation. Docs has only response as error 400
	// If validation fails, or doesn't exist,  we will just say it doesn't exist.
	// Would ask Product owner how they want input validation handled
	if (error || !recieptDatabase[id]) {
		return res.status(400).send("No receipt found for that id");
	}

	return res.status(200).send({ points: recieptDatabase[id] });
});

app.post("/receipts/process", (req, res) => {
	// verify the payload with recieptSchema
	console.log(req.body);
	const { error } = receiptSchema.validate(req.body);

	if (error) {
		return res.status(400).send("The receipt is invalid");
	}

	const awardedPoints = calculatePointsValue(req.body);
	const recieptID = uuidv4();

	recieptDatabase[recieptID] = awardedPoints;

	return res.status(200).send({ id: recieptID });
});

app.listen(PORT, (error) => {
	if (error) {
		return console.log("Error: ", error);
	}
	console.log("Server is listening on port " + PORT);
});

function calculatePointsValue(reciept) {
	return 10;
}
