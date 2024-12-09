const request = require('supertest');
const app = require('../server');

// Added test case for auth.js to check invalid username & password
describe("Auth API Negative Tests", () => {
    test("POST /api/auth/login - Should return 401 for invalid credentials", async () => {
      const invalidCredentials = {
        username: "wronguser",
        password: "wrongpassword",
      };
  
      const response = await request(app).post("/api/auth/login").send(invalidCredentials);
      expect(response.statusCode).toBe(400);
      expect(response.body).toHaveProperty("message", "Invalid username or password");
    });
});