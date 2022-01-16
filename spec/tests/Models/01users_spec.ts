import { UserModel } from "../../../src/Models/users";

const user = new UserModel();
let token: string;
let token2: string;

describe("User Model", () => {
  it("should have create method", () => {
    expect(user.create).toBeDefined();
  });

  it("should have show method", () => {
    expect(user.show).toBeDefined();
  });

  it("should have index method", () => {
    expect(user.index).toBeDefined();
  });

  it("should have delete method", () => {
    expect(user.delete).toBeDefined();
  });

  it("create user in database ", async () => {
    token = await user.create({
      firstName: "john",
      lastName: "smith",
      password: "123",
    });
    expect(200);
  });

  it("create anther user in database ", async () => {
    token2 = await user.create({
      firstName: "sara",
      lastName: "jane",
      password: "456",
    });
    expect(200);
  });

  // =============================show====================================

  it("should give 200 when data is correct ", async () => {
    const results = await user.show({
      firstName: "sara",
      lastName: "jane",
      password: "4565",
    });
    expect(200);
  });

  it("should give me invalid Credintial when wrong password ", async () => {
    const results = await user.show({
      firstName: "sara",
      lastName: "jane",
      password: "4565",
    });
    expect(results).toEqual("invalid Credintial");
  });

  it("should give 'this user maybe not available' with wrong user data ", async () => {
    const results = await user.show({
      firstName: "danah",
      lastName: "jane",
      password: "456",
    });
    expect(results).toEqual("this user maybe not available");
  });

  it("index all users in database ", async () => {
    const result = await user.index("1", token);
    expect(result).toEqual([
      {
        id: 1,
        firstname: "john",
        lastname: "smith",
      },
      {
        id: 2,
        firstname: "sara",
        lastname: "jane",
      },
    ]);
  });

  it("delete user from database ", async () => {
    const result = await user.delete("2", token2);
    expect(result).toEqual("user deleted successfully");
  });
});

export { token };
