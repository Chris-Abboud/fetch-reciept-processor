const request = require("supertest");
const { app, server } = require("./index.js");
const { addToDatabase, getFromDatabase, dataStore } = require("./database.js"); // Import the mock functions and dataStore

jest.mock("./database.js");

afterAll(() => {
	server.close();
});

describe("POST /receipts/process", () => {
	describe("Given a valid reciept", () => {
		test("Should respond with  reciept ID", async () => {
			const response = await request(app).post("/receipts/process").send(goodReceipt);
			expect(response.body).toHaveProperty("id");
		});

		test("should respond with a 200 status code", async () => {
			const response = await request(app).post("/receipts/process").send(goodReceipt);
			expect(response.statusCode).toBe(200);
		});

		test("Points Rewards Value of 28 should be added to database", async () => {
			const response = await request(app).post("/receipts/process").send(goodReceipt);
			expect(addToDatabase).toHaveBeenCalledWith(expect.any(String), 28);
		});
	});

	describe("Given A Reciept is missing", () => {
		test("Server should respond with 400 status code", async () => {
			const response = await request(app).post("/receipts/process").send({});
			expect(response.statusCode).toBe(400);
		});

		test("Server should respond with the message The receipt is invalid", async () => {
			const response = await request(app).post("/receipts/process").send({});
			expect(response.text).toBe("The receipt is invalid");
		});
	});

	describe("Given the length of the items array is 0", () => {
		test("Server should respond with 400 status code", async () => {
			const response = await request(app).post("/receipts/process").send(recieptItemLengthZero);
			expect(response.statusCode).toBe(400);
		});

		test("Server should respond with the message The receipt is invalid", async () => {
			const response = await request(app).post("/receipts/process").send(recieptItemLengthZero);
			expect(response.text).toBe("The receipt is invalid");
		});
	});
});

describe("GET /receipts/:id/points", () => {
	describe("Given a invalid reciept ID", () => {
		test("Server should respond with status code 400", async () => {
			const response = await request(app).get("/receipts/123456789/points");
			expect(response.statusCode).toBe(400);
		});
		test("Server should respond with data No receipt found for that id", async () => {
			const response = await request(app).get("/receipts/123456789/points");
			expect(response.text).toBe("No receipt found for that id");
		});
	});

	describe("Given a valid existing ID", () => {
		beforeEach(() => {
			getFromDatabase.mockImplementation((id) => {
				if (id === "123456789") {
					return 28;
				}
				return null;
			});
		});

		test("Server should respond with status code 200", async () => {
			const response = await request(app).get("/receipts/123456789/points");
			expect(response.statusCode).toBe(200);
		});

		test("Server should return the points value for that id", async () => {
			const response = await request(app).get("/receipts/123456789/points");
			expect(response.body.points).toBe(28);
		});
	});
});

const goodReceipt = {
	retailer: "Target",
	purchaseDate: "2022-01-01",
	purchaseTime: "13:01",
	items: [
		{
			shortDescription: "Mountain Dew 12PK",
			price: "6.49",
		},
		{
			shortDescription: "Emils Cheese Pizza",
			price: "12.25",
		},
		{
			shortDescription: "Knorr Creamy Chicken",
			price: "1.26",
		},
		{
			shortDescription: "Doritos Nacho Cheese",
			price: "3.35",
		},
		{
			shortDescription: "   Klarbrunn 12-PK 12 FL OZ  ",
			price: "12.00",
		},
	],
	total: "35.35",
};

const recieptItemLengthZero = {
	retailer: "Target",
	purchaseDate: "2022-01-01",
	purchaseTime: "13:01",
	items: [],
	total: "35.35",
};
