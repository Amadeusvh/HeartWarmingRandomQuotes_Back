import { Request, Response } from "express";
import prisma from "../infra/db/index";

const getQuotes = async (req: Request, res: Response) => {

  const quotes = await prisma.quote.findMany();
  res.json(quotes);

};

export default getQuotes;
