const request = require("supertest")
const app = require("../src/app")
const sinon = require('sinon')

const userServices = require('../src/api/users/users.services');
const authServices = require('../src/api/auth/auth.services')

//require("dotenv").config();

// jest.mock("../src/api/users/users.services")

const mockUser = { firstName: "Bob", lastName: "IK", email: "bobik@tuni.fi", password: "bob" }
const mockToken = { accessToken: "123456", refreshToken: "123447" }
//const mockFindByEmail = { email };
describe("POST /api/auth/register", () => {
    let sandbox = sinon.createSandbox();
    afterEach(() => {
        // !important to call this in afterEach.
        sandbox.restore();
      });
    test("should return all products", async () => {
        const createUserMock = sandbox.stub(userServices, "createUser")
        createUserMock.resolves(mockUser)
        const addRefreshTokenToWhitelistMock = sandbox.stub(authServices, 'addRefreshTokenToWhitelist')
        addRefreshTokenToWhitelistMock.resolves(mockToken)
        const findUserByEmailMock = sandbox.stub(userServices, "findUserByEmail")
        findUserByEmailMock.resolves(undefined)
        const res = await request(app)
            .post("/api/auth/register").send(mockUser)
            .expect('Content-Type', /json/)
            //.expect(200)
            .then((res) => {
                //console.log(res);
                //expect(res.statusCode).toBe(200);
                expect(res.body).toBe(mockToken);
                expect(createUserMock.mock.calls.length).toEqual(1);
                expect(createUserMock.mock.calls[0][0]).toBe(mockUser);
           })
    });
});