import axios from "axios";

const testURL = `${process.env.APP_URL || "http://localhost:8080"}/auth`
const testUser = {
  name: "John Doe",
  email: "test@example.com",
  password: "password123",
};


describe("Authentication API", () => {
  //Register
/*   describe("POST /register", () => {
    it("should register a new user", async () => {
		  const response = await axios.post(`${testURL}/register`, testUser);

      expect(response.status).toBe(200);
      expect(response.data).toHaveProperty(
        "message",
        "User created successfully"
      );

    });

  }); */

  //Verify Email
/*   describe("GET /verify/:token", () => {
    it("should verify a user's email", async () => {
      const response = await axios.get(`${testURL}/verify/123456789`);

      expect(response.status).toBe(200);
      expect(response.data).toHaveProperty(
        "message",
        "Email verified successfully"
      );
    });
  }); */

  //Login
  describe("POST /login", () => {
    it("should login a user", async () => {
      const response = await axios.post(`${testURL}/login`, {
        email: testUser.email,
        password: testUser.password,
      });

      expect(response.status).toBe(200);
      expect(response.data).toHaveProperty("token");
    });
  });

  // TODO Remove Account

});
