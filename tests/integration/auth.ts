import { Express } from "express";
import faker from "faker";
import { connect, disconnect } from "mongoose";
import request from "supertest";
import { createExpressApp } from "../../src/app";
import { UserDocument } from "../../src/models";
import { MONGO_OPTIONS, MONGO_URI } from "../config";
import { createNewUser } from "../util";

let server: Express;

beforeAll(async () => {
  await connect(MONGO_URI, MONGO_OPTIONS);
  server = await createExpressApp();
});

afterAll(async () => {
  await disconnect();
});

describe("POST /api/auth/signup", () => {
  const endpoint = "/api/auth/signup";
  it("200 OK", async () => {
    await request(server)
      .post(endpoint)
      .send({ email: faker.internet.email(), password: faker.random.alphaNumeric(6) })
      .expect(200);
  });

  it("400 INVALID DATA", async () => {
    await request(server)
      .post(endpoint)
      .send({ email: faker.internet.email(), password: "" })
      .expect(400);
  });

  it("400 DUPLICATE EMAIL", async () => {
    const user = await createNewUser();

    await request(server)
      .post(endpoint)
      .send({ email: user.email, password: user.password })
      .expect(400);
  });
});

describe("POST /api/auth/login", () => {
  const endpoint = "/api/auth/login";
  const pswd = "test123";
  let user: UserDocument;
  beforeAll(async () => {
    user = await createNewUser(pswd);
  });

  it("200 OK", async () => {
    await request(server)
      .post(endpoint)
      .send({ email: user.email, password: pswd })
      .expect(200);
  });

  it("400 INVALID EMAIL", async () => {
    await request(server)
      .post(endpoint)
      .send({ email: "asd@mail.com", password: pswd })
      .expect(400);
  });

  it("400 INVALID PASSWORD", async () => {
    await request(server)
      .post(endpoint)
      .send({ email: user.email, password: "asd" })
      .expect(400);
  });
});
