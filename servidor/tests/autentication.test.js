import axios from "axios";

const testURL = `${process.env.APP_URL || "http://localhost:8080"}/auth`
let testUser = {
  id: "",
  name: "John Doe",
  email: "test@example.com",
  password: "password123",
};


describe("Authentication API", () => {
  //Register
  describe("POST /register", () => {
    it("should register a new user", async () => {
		  const response = await axios.post(`${testURL}/register`, testUser);

      expect(response.status).toBe(200);
      expect(response.data).toHaveProperty(
        "message",
        "User created successfully"
      );

      testUser.id = response.data.userId;
      console.log("TestUser",testUser)

    });

  });

  //Verify Email
  describe("GET /confirmarUsuario/:email/:key", () => {
    it("should verify a user's email", async () => {
      const response = await axios.get(`${testURL}/confirmarUsuario/${testUser.email}/${testUser.id}`);

      expect(response.status).toBe(200);
      
    });
  });

  //Login
  describe("POST /login", () => {
    it("should login a user", async () => {
      const response = await axios.post(`${testURL}/login`, {
        email: testUser.email,
        password: testUser.password,
      });

      expect(response.status).toBe(200);
      expect(response.data).toHaveProperty("email")
      expect(response.data.email).toBe(testUser.email)
    });
  });

  //Remove user account
  describe("DELETE /removeAccount/:id", () => {
    it("should delete a user's account", async () => {
      console.log("Remove ID",testUser.id)
      const response = await axios.post(`${testURL}/removeAccount`,{id:testUser.id});

      expect(response.status).toBe(200);
      expect(response.data).toHaveProperty("message", "User deleted successfully");
    });
  }); 
  

});
