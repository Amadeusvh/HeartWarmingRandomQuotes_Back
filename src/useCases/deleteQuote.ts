import { Request, Response } from "express";
import prisma from "../infra/db/index";

const deleteQuote = async (req: Request, res: Response) => {

  const id = req.params.id

  const sanitizedId = Number(id);

  if (isNaN(sanitizedId))
    return res.status(400).end();

  return await prisma.quote.findUnique({
    where: {
      id: sanitizedId,
    }
  })
  .then(
    async (foundQuote) => {
      if (!foundQuote) 
        return res.status(404).end();

      const deleteQuote = prisma.quote.delete({
        where: {
          id: sanitizedId,
        },
      });
      
      return await deleteQuote.then((deletedQuote) => res.json(deletedQuote))  
      
    }
  )
};

export default deleteQuote;
