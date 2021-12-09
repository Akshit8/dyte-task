import { Express } from "express";
import { connect, disconnect } from "mongoose";
import request from "supertest";
import { createExpressApp } from "../../src/app";
import { MONGO_OPTIONS, MONGO_URI } from "../config";
import { getAuthToken } from "../util";

let server: Express;

beforeAll(async () => {
  await connect(MONGO_URI, MONGO_OPTIONS);
  server = await createExpressApp();
});

afterAll(async () => {
  await disconnect();
});

describe("POST /api/user", () => {
  const endpoint = "/api/user";

  it("200 OK", async () => {
    const token = await getAuthToken(true);
    console.log(token);
    await request(server)
      .post(endpoint)
      .set({ Authorization: `Bearer ${token}` })
      .expect(200);
  });

  it("401 INVALID TOKEN", async () => {
    await request(server)
      .post(endpoint)
      .set({ Authorization: `Bearer ${await getAuthToken(false)}` })
      .expect(401);
  });
});
