import { ProductModel } from "../../../src/Models/product";

const product = new ProductModel();
import { token } from "./01users_spec";

describe("product Model", () => {
  it("should have create method", () => {
    expect(product.create).toBeDefined();
  });

  it("should have show method", () => {
    expect(product.show).toBeDefined();
  });

  it("should have index method", () => {
    expect(product.index).toBeDefined();
  });

  it("should have delete method", () => {
    expect(product.delete).toBeDefined();
  });

  it("create product in database ", async () => {
    const results = await product.create(
      {
        name: "iphone",
        price: 1500,
        category: "mobiles",
      },
      token,
      "1"
    );
    expect(results).toEqual({
      id: 1,
      name: "iphone",
      price: 1500,
      category: "mobiles",
    });
  });

  it("create anther product in database ", async () => {
    const results = await product.create(
      {
        name: "samsung S10",
        price: 1000,
        category: "mobiles",
      },
      token,
      "1"
    );
    expect(results).toEqual({
      id: 2,
      name: "samsung S10",
      price: 1000,
      category: "mobiles",
    });
  });
  // =============================show====================================

  it("should show the required product ", async () => {
    const results = await product.show("1");
    expect(results).toEqual({
      id: 1,
      name: "iphone",
      price: 1500,
      category: "mobiles",
    });
  });

  it("index all products in database ", async () => {
    const result = await product.index();
    expect(result).toEqual([
      {
        id: 1,
        name: "iphone",
        price: 1500,
        category: "mobiles",
      },
      {
        id: 2,
        name: "samsung S10",
        price: 1000,
        category: "mobiles",
      },
    ]);
  });

  it("delete product from database ", async () => {
    const result = await product.delete("2", "1", token);
    expect(result).toEqual("Product deleted successfully");
  });
});
