import { response } from "express";
import supertest from "supertest";
import app from "../../../src/server";
import { newToken } from "./01users_spec";

const request = supertest(app);
describe("Test product endpoints ", () => {
  it("POST Create new Product endpoint", async done => {
    const res = await request
      .post("/api/users/4/product/create")
      .send({
        name: "Macbook",
        price: 1000,
        category: "labtops",
      })
      .set("Authorization", "Bearer " + newToken);
    expect(res.body).toEqual({
      id: 3,
      name: "Macbook",
      price: 1000,
      category: "labtops",
    });

    done();
  });

  it("GET index Products endpoint", async done => {
    const res = await request.get("/api/products/index/");

    expect(res.body).toEqual([
      { id: 1, name: "iphone", price: 1500, category: "mobiles" },
      { id: 3, name: "Macbook", price: 1000, category: "labtops" },
    ]);

    done();
  });

  it("GET SHOW A Product endpoint", async done => {
    const res = await request.get("/api/products/show/1");

    expect(res.body).toEqual({
      id: 1,
      name: "iphone",
      price: 1500,
      category: "mobiles",
    });

    done();
  });

  it("POST DELETE a Product endpoint", async done => {
    const res = await request
      .delete("/api/users/4/product/delete/3")
      .set("Authorization", "Bearer " + newToken);
    expect(res.text).toEqual("Product deleted successfully");

    done();
  });
});
