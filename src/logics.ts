import { Request, Response } from "express";
import market from "./database";
import { Product } from "./interfaces";

const getNextId = (): number => {
  const lastProduct: Product | undefined = market
    .sort((a: Product, b: Product): number => a.id - b.id)
    .at(-1);

  if (!lastProduct) {
    return 1;
  }

  return lastProduct.id + 1;
};

const readProducts = (req: Request, res: Response): Response => {
  const totalPrice = market.reduce((acc, act): number => {
    return acc + Number(act.price);
  }, 0);

  return res.status(200).json({ total: totalPrice, products: market });
};

const readProductsById = (req: Request, res: Response): Response => {
  const { foundProduct } = res.locals;

  return res.status(200).json(foundProduct);
};

const createProduct = (req: Request, res: Response): Response => {
  const dueDate: Date = new Date(Date.now() + 1000 * 60 * 60 * 24 * 365);
  const newProduct: Product = {
    id: getNextId(),
    ...req.body,
    expirationDate: dueDate,
  };
  market.push(newProduct);
  return res.status(201).json(newProduct);
};

const updateProduct = (req: Request, res: Response): Response => {
  const { foundProduct, productIndex } = res.locals;

  const updatedProduct: Product = {
    ...foundProduct,
    ...req.body,
  };

  market[productIndex] = updatedProduct;

  return res.status(200).json(updatedProduct);
};

const removeProduct = (req: Request, res: Response): Response => {
  const { productIndex } = res.locals;
  market.splice(productIndex, 1);
  return res.status(204).json();
};

export default {
  readProducts,
  createProduct,
  updateProduct,
  removeProduct,
  readProductsById,
};
