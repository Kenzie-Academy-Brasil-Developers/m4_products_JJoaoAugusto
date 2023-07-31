import express, { Application, json } from "express";
import logics from "./logics";
import middlewares from "./middlewares";

const app: Application = express();
app.use(json());
app.use(middlewares.requestLog);

app.get("/products", logics.readProducts);
app.get("/products/:id", middlewares.findById, logics.readProductsById);
app.post("/products", middlewares.findByName, logics.createProduct);
app.patch(
  "/products/:id",
  middlewares.findByName,
  middlewares.findById,
  logics.updateProduct
);
app.delete("/products/:id", middlewares.findById, logics.removeProduct);

const PORT: number = 3000;
const runningMsg: string = `Server running on http://localhost:${PORT}`;
app.listen(PORT, () => console.log(runningMsg));
