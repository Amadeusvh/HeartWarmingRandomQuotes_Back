import { Request, Response } from "express";
import prisma from "../infra/db/index";

const getQuote = async (req: Request, res: Response) => {

  const {
    id
  } = req.params
  
  const sanitizedId = Number(id);

  if (isNaN(sanitizedId))
    return res.status(400).end();
  
  const getQuote = await prisma.quote.findUnique({
    where: {
      id: sanitizedId,
    },
  });

  return res.json(getQuote);

};

export default getQuote;
