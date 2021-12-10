import { Express } from "express";
import faker from "faker";
import { ObjectId } from "mongodb";
import { connect, disconnect } from "mongoose";
import request from "supertest";
import { createExpressApp } from "../../src/app";
import { URLDocument } from "../../src/models";
import { JWTUtility } from "../../src/utils";
import { MONGO_OPTIONS, MONGO_URI } from "../config";
import { createNewURL, getAuthToken } from "../util";

let server: Express;

beforeAll(async () => {
  await connect(MONGO_URI, MONGO_OPTIONS);
  server = await createExpressApp();
});

afterAll(async () => {
  await disconnect();
});

describe("POST /api/url", () => {
  const endpoint = "/api/url";
  let token: string;
  beforeAll(async () => {
    token = await getAuthToken(true);
  });

  it("201 CREATED", async () => {
    await request(server)
      .post(endpoint)
      .set({ Authorization: `Bearer ${token}` })
      .send({ url: faker.internet.url() })
      .expect(201);
  });

  it("400 REPEATED CODE", async () => {
    const url = await createNewURL();

    await request(server)
      .post(endpoint)
      .set({ Authorization: `Bearer ${token}` })
      .send({ code: url.code, url: faker.internet.url() })
      .expect(400);
  });
});

describe("GET /api/url", () => {
  const endpoint = "/api/url";
  let token: string;
  let url: URLDocument;
  beforeAll(async () => {
    url = await createNewURL();
    token = await new JWTUtility().signToken({ id: url.owner.toString() });
  });

  it("200 OK", async () => {
    await request(server)
      .get(`${endpoint}/${url._id}`)
      .set({ Authorization: `Bearer ${token}` })
      .expect(200);
  });

  it("404 NOT FOUND", async () => {
    await request(server)
      .get(`${endpoint}/${new ObjectId().toString()}`)
      .set({ Authorization: `Bearer ${token}` })
      .expect(404);
  });
});
