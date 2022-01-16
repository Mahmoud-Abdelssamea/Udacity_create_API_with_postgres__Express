import { Order_ProductModel, OrderModel } from "../../../src/Models/orders";
import { DashboardQueries } from "../../../src/services/dashbourd";

const orders = new OrderModel();
const orders_products = new Order_ProductModel();
const dashbourd = new DashboardQueries();

import { token } from "./01users_spec";

describe("Order Model", () => {
  it("should have create method", () => {
    expect(orders.create).toBeDefined();
  });

  it("should have delete method", () => {
    expect(orders.delete).toBeDefined();
  });

  it("should have addproduct method", () => {
    expect(orders_products.addproduct).toBeDefined();
  });

  it("create order in database ", async () => {
    const results = await orders.create(
      { user_id: "1", status: "active" },
      token
    );
    expect(results).toEqual({
      id: 1,
      user_id: "1",
      status: "active",
    });
  });

  //   =============================create anther product==================

  it("create product in database ", async () => {
    const results = await orders.create(
      { user_id: "1", status: "completed" },
      token
    );
    expect(results).toEqual({
      id: 2,
      user_id: "1",
      status: "completed",
    });
  });

  // =============================add  product to order====================================

  it("add product to Order 1 ", async () => {
    const results = await orders_products.addproduct({
      user_id: "1",
      order_id: "1",
      product_id: "1",
      quantity: 2,
      token,
    });
    expect(results).toEqual({
      id: 1,
      product_id: "1",
      order_id: "1",
      quantity: 2,
    });
  });

  it("index all products in database ", async () => {
    const orders_products = new Order_ProductModel();
    const result = await dashbourd.productsInOrders({
      order_id: "1",
      user_id: "1",
      token,
    });
    expect(result).toEqual([
      {
        name: "iphone",
        price: 1500,
        status: "active",
        order_id: "1",
      },
    ]);
  });

  it("delete order in database ", async () => {
    const orders_products = new Order_ProductModel();
    const result = await orders.delete("1", "1", token);
    expect(result).toEqual("Order deleted successfully");
  });
});
