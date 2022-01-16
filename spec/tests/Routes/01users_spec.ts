import { response } from "express";
import supertest from "supertest";
import app from "../../../src/server";
import { token } from "../Models/01users_spec";

let newToken: string;
const request = supertest(app);
describe("Test User endpoints ", () => {
  it("POST signup endpoint", async done => {
    await request
      .post("/api/users/signup")
      .send({ firstName: "dam", lastName: "max", password: "789" })
      .expect(200);

    done();
  });

  it("POST login endpoint", async done => {
    await request
      .post("/api/users/login")
      .send({ firstName: "dam", lastName: "max", password: "789" })
      .expect(200);
    done();
  });

  it("GET index endpoint", async done => {
    await request
      .get("/api/users/index/1")

      .set("Authorization", "Bearer " + token)
      .expect([
        { id: 1, firstname: "john", lastname: "smith" },
        { id: 3, firstname: "dam", lastname: "max" },
      ]);
    done();
  });

  it("DELETE user endpoint", async done => {
    await request
      .delete("/api/users/delete/1")
      .set("Authorization", "Bearer " + token)
      .expect("user deleted successfully");

    done();
  });

  it("POST signup new user endpoint", async done => {
    const res = await request
      .post("/api/users/signup")
      .send({ firstName: "Moh", lastName: "Salah", password: "123" })
      .expect(200);
    newToken = res.text;
    done();
  });
});

export { newToken };
