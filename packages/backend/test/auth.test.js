const { generateTokens } = require("../src/utils/jwt");
const { addRefreshTokenToWhitelist } = require("../src/api/auth/auth.services");
const {
  findUserByEmail,
  createUser,
} = require("../src/api/users/users.services");

const express = require("express");
const supertest = require("supertest");
const bcrypt = require("bcrypt");

jest.mock("../src/api/users/users.services", () => ({
  findUserByEmail: jest.fn(),
  createUser: jest.fn(),
}));

jest.mock("../src/api/auth/auth.services", () => ({
  addRefreshTokenToWhitelist: jest.fn(),
}));
jest.mock("../src/utils/jwt", () => ({
  generateTokens: jest.fn(),
}));

// Mock the behavior of generateTokens
const mockTokens = {
  accessToken: "mockAccessToken",
  refreshToken: "mockRefreshToken",
};
generateTokens.mockReturnValue(mockTokens);

// Mock the behavior of addRefreshTokenToWhitelist
addRefreshTokenToWhitelist.mockResolvedValue();

const registerRoute = require("../src/api/auth/auth.routes");
const loginRoute = require("../src/api/auth/auth.routes");

describe("Register Route", () => {
  it("registers a new user", async () => {
    const app = express();
    app.use(express.json());
    app.use("/api/auth", registerRoute);
    const req = {
      body: {
        firstName: "John",
        lastName: "Doe",
        email: "john@example.com",
        password: "password123",
      },
    };

    const response = await supertest(app)
      .post("/api/auth/register")
      .send(req.body);

    expect(findUserByEmail).toHaveBeenCalledWith("john@example.com");
    expect(createUser).toHaveBeenCalledWith({
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      password: "password123",
    });
  });
});

describe("Login Route", () => {
  it("should log in a user successfully", async () => {
    const app = express();
    app.use(express.json());
    app.use("/api/auth", loginRoute);
    // Mock data and behavior for the findUserByEmail function
    const mockUser = {
      email: "test@example.com",
      password: await bcrypt.hash("password123", 10), // Hashed password
      // Other user properties...
    };
    findUserByEmail.mockResolvedValue(mockUser);

    // Send a request to the login route
    const response = await supertest(app)
      .post("/api/auth/login")
      .send({ email: "test@example.com", password: "password123" });

    // Assertions
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(mockTokens);
  });
});
