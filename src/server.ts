import express from "express";
import * as dotenv from "dotenv";
dotenv.config();
import userRoute from "./Routes/users";
import productRoute from "./Routes/product";
import orderRoute from "./Routes/order";

const port = process.env.PORT || 4000;
const app: express.Application = express();
const address: string = "http://localhost:" + port;

//  define the json data on server
app.use(express.json());

app.use("/api", userRoute);
app.use("/api", productRoute);
app.use("/api", orderRoute);

app.listen(port, () => {
  console.log(`starting app on: ${address}`);
});

export default app;
