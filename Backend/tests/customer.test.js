const request = require("supertest");
const app = require("../server");

describe("Customer API Negative Tests", () => {
  test("GET /api/customers/:id - Should return 404 for non-existent customer", async () => {
    const response = await request(app).get("/api/customers/9999"); // Assuming 9999 does not exist
    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty("message", "Customer not found");
  });

  test("POST /api/customers - Should return 400 for missing required fields", async () => {
    const invalidCustomer = {
      name: "Incomplete Data", // Missing `customerID`, `email`, `phone`
    };

    const response = await request(app).post("/api/customers").send(invalidCustomer);
    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty("message", "Missing required customer fields");
  });

  test("PUT /api/customers/:id - Should return 404 for updating non-existent customer", async () => {
    const updatedCustomer = {
      name: "Does Not Exist",
      email: "nonexistent@example.com",
    };

    const response = await request(app).put("/api/customers/9999").send(updatedCustomer); // Assuming 9999 does not exist
    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty("message", "Customer not found");
  });

  test("DELETE /api/customers/:id - Should return 404 for non-existent customer", async () => {
    const response = await request(app).delete("/api/customers/9999"); // Assuming 9999 does not exist
    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty("message", "Customer not found");
  });
});
