import { Request, Response } from "express";
import prisma from "../infra/db/index";
import { QuoteType } from "src/type/quoteType";

const getRandomQuote = async (req: Request, res: Response) => {
  
  const result: QuoteType[] = await prisma.$queryRaw`
    SELECT *
    FROM "public"."Quote"
    ORDER BY random()
    LIMIT 1;
  `
  const randomQuote = result[0];

  if(!randomQuote){
    res
    .status(404)
    .end();
  }

  res.json(randomQuote);

};

export default getRandomQuote;
