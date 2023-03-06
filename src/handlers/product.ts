import { Request, Response } from "express";

import prisma from "../db";

//Get all products depending on logged-in user
export const getProducts = async (req: Request, res: Response) => {
  // console.log("ReQ BODY: ", req.body);

  const user = await prisma.user.findUnique({
    where: {
      id: req.body.user.id,
    },
    include: {
      products: true,
    },
  });
  // console.log("FOUND USER: ", user);

  res.json({ data: user?.products });
};

//Get one product depending on logged-in user

export const getOneProduct = async (req: Request, res: Response) => {
  //get id from params
  const prodId = req.params.id;

  //qury product table to find product with ID and belongs to signed in user
  const product = await prisma.product.findFirst({
    where: {
      id: prodId,
      belongsToId: req.body.user.id,
    },
  });
  console.log("FOUND product: ", product);

  res.json({ data: product });
};

export const createProduct = async (req: Request, res: Response) => {
  //qury product table to find product with ID and belongs to signed in user
  const product = await prisma.product.create({
    data: {
      name: req.body.name,
      belongsToId: req.body.user.id,
    },
  });

  console.log("created product: ", product);

  res.json({ data: product });
};

export const updateProduct = async (req: Request, res: Response) => {
  //qury product table to find product with ID and belongs to signed in user

  const updatedProduct = await prisma.product.update({
    where: {
      id_belongsToId: { id: req.body.user.id, belongsToId: req.body.user.id },
    },
    data: {
      name: req.body.name,
    },
  });

  console.log("Updated product: ", updatedProduct);

  res.json({ data: updatedProduct });
};

export const deleteProduct = async (req: Request, res: Response) => {
  //qury product table to find product with ID and belongs to signed in user

  const deletedProduct = await prisma.product.delete({
    where: {
      id_belongsToId: { id: req.params.id, belongsToId: req.body.user.id },
    },
  });

  console.log("deleted product: ", deletedProduct);

  res.json({ data: deletedProduct });
};
