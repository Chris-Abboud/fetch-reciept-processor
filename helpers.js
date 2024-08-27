async function calculatePointsValue(reciept) {
	let totalPoints = 0;

	recieptTotal = Number(reciept.total);

	totalPoints += await countAlphanumeric(reciept.retailer);

	// +50 if total is an integer
	if (recieptTotal % 1 == 0) {
		totalPoints += 50;
	}

	// +25 if divisible by 0.25
	if (recieptTotal % 0.25 == 0) {
		totalPoints += 25;
	}

	// +5 for every 2 items
	totalPoints += Math.floor(reciept.items.length / 2) * 5;

	for (let item of reciept.items) {
		if ((await item.shortDescription.trim().length) % 3 == 0) {
			totalPoints += Math.ceil(0.2 * Number(item.price));
		}
	}

	// 6 points if purchase day is odd
	// Need confirm with product owner if year-month-day or year-day-month
	// Does timezone matter for local machine? For now, just use UTC Date
	const purchaseDate = new Date(reciept.purchaseDate);
	const purchaseDay = purchaseDate.getUTCDate();

	if (purchaseDay % 2 == 1) {
		totalPoints += 6;
	}

	// +10 if purchase time is between 2 PM and 4 PM
	if (isBetweenTwoAndFour(reciept.purchaseTime)) {
		totalPoints += 10;
	}

	return totalPoints;
}

function isBetweenTwoAndFour(purchaseTime) {
	const time = toMinutes(purchaseTime);
	const start = toMinutes("14:00"); // 2 PM
	const end = toMinutes("16:00"); // 4 PM

	return time > start && time < end;
}

function toMinutes(time) {
	const [hours, minutes] = time.split(":").map(Number);
	return hours * 60 + minutes;
}
function countAlphanumeric(str) {
	// Match all alphanumeric characters (letters and numbers)
	const matches = str.match(/[a-zA-Z0-9]/g);
	// Return the number of matches or 0 if no matches found
	return matches ? matches.length : 0;
}

module.exports = {
	calculatePointsValue,
};
