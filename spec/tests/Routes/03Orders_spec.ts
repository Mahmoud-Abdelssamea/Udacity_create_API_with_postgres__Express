import { response } from "express";
import supertest from "supertest";
import app from "../../../src/server";
import { newToken } from "./01users_spec";

const request = supertest(app);
describe("Test Orders endpoints ", () => {
  it("POST Create new Order endpoint", async done => {
    const res = await request
      .post("/api/users/4/orders/create")
      .send({ status: "active" })
      .set("Authorization", "Bearer " + newToken);
    expect(res.body).toEqual({
      id: 3,
      user_id: "4",
      status: "active",
    });

    done();
  });

  it("POST add Product to Order endpoint", async done => {
    const res = await request
      .post("/api/users/4/orders/add/3")
      .set("Authorization", "Bearer " + newToken)
      .send({
        product_id: "1",
        quantity: 2,
      });
    expect(res.body).toEqual({
      id: 2,
      product_id: "1",
      quantity: 2,
      order_id: "3",
    });
    done();
  });

  it("GET SHOW an order endpoint", async done => {
    const res = await request
      .get("/api//users/4/orders/show/3")
      .set("Authorization", "Bearer " + newToken);

    expect(res.body).toEqual([
      {
        name: "iphone",
        price: 1500,
        status: "active",
        order_id: "3",
      },
    ]);

    done();
  });

  it("POST DELETE a Product endpoint", async done => {
    const res = await request
      .delete("/api/users/4/orders/delete/3")
      .set("Authorization", "Bearer " + newToken);
    expect(res.text).toEqual("Order deleted successfully");

    done();
  });
});
