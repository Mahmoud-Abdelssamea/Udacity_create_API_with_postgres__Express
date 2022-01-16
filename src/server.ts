import express from "express";
import * as dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import userRoute from "./Routes/users";
import productRoute from "./Routes/product";
import orderRoute from "./Routes/order";

const port = process.env.PORT || 4000;
const app: express.Application = express();
const address: string = "http://localhost:" + port;

app.use(cors());

//  define the json data on server
app.use(express.json());

app.use("/api", userRoute);
app.use("/api", productRoute);
app.use("/api", orderRoute);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`starting app on: ${address}`);
});

export default app;
