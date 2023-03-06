import { Request, Response } from "express";

import { Update } from "@prisma/client";
import prisma from "../db";

//Get all products depending on logged-in user
export const getUpdates = async (req: Request, res: Response) => {
  // console.log("ReQ BODY: ", req.body);

  //get products that belong to logged in user
  const products = await prisma.product.findMany({
    where: {
      belongsToId: req.body.user.id,
    },
    include: {
      updates: true,
    },
  });

  const updates = products.reduce((allUpdates: any, product) => {
    return [...allUpdates, ...product.updates];
  }, []);

  console.log("FOUND updates: ", updates);

  res.json({ data: updates });
};

//Get one product depending on logged-in user

export const getOneUpdate = async (req: Request, res: Response) => {
  //qury product table to find product with ID and belongs to signed in user
  const update = await prisma.update.findUnique({
    where: {
      id: req.params.id,
    },
  });
  console.log("FOUND update: ", update);

  res.json({ data: update });
};

export const createUpdate = async (req: Request, res: Response) => {
  //qury product table to find product with ID and belongs to signed in user
  const product = await prisma.product.findUnique({
    where: {
      id: req.body.productId,
    },
  });

  if (!product) {
    //does not belong to user
    return res.json({ message: "nope" });
  }

  const update = await prisma.update.create({
    data: {
      title: req.body.title,
      body: req.body.body,
      product: { connect: { id: product.id } },
    },
  });

  console.log("created update: ", update);

  res.json({ data: update });
};

export const updateUpdate = async (req: Request, res: Response) => {
  //qury product table to find product with ID and belongs to signed in user
  const products = await prisma.product.findMany({
    where: {
      belongsToId: req.body.user.id,
    },
    include: {
      updates: true,
    },
  });

  const updates = products.reduce((allUpdates: any, product) => {
    return [...allUpdates, ...product.updates];
  }, []);

  console.log("UPDATES FROM UPDATE: ", updates);

  const foundupdate = updates.find(
    (update: Update) => update.id === req.params.id
  );

  console.log("FOUND UPDATE: ", foundupdate);

  if (!foundupdate) {
    //handle case
    return res.json({ message: "not found" });
  }

  const updated = await prisma.update.update({
    where: {
      id: req.params.id,
    },
    data: req.body,
  });

  return res.json({ data: updated });
};

export const deleteUpdate = async (req: Request, res: Response) => {
  //qury product table to find product with ID and belongs to signed in user

  const products = await prisma.product.findMany({
    where: {
      belongsToId: req.body.user.id,
    },
    include: {
      updates: true,
    },
  });

  const updates = products.reduce((allUpdates: any, product) => {
    return [...allUpdates, product.updates];
  }, []);

  const foundupdate = updates.find(
    (update: Update) => update.id === req.params.id
  );

  if (!foundupdate) {
    //handle case
    return res.json({ message: "not found" });
  }

  const deleted = await prisma.update.delete({
    where: {
      id: req.params.id,
    },
  });

  return res.json({ data: deleted });
};
