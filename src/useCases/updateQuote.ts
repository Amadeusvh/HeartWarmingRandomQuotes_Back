import { Request, Response } from "express";
import prisma from "../infra/db/index";
import { ValidationRule } from "../type/validationRulesType";

type Body = {
  readonly id: string;
  readonly content: string;
}

const VALIDATION_RULES: ValidationRule<Body>[] = [
  {
    condition: (body) => body.content.length > 280,
    message: "The content of the quote cannot exceed 280 letters"
  },
  {
    condition: (body) => typeof body.content !== "string",
    message: "Content of the quote must be a string"
  },
  {
    condition: (body) => typeof body.id !== "number",
    message: "Id must be a number"
  }
];

const updateQuote = async (req: Request, res: Response) => {

  const {
    id,
    content
  } = req.body

  const validationErrors = VALIDATION_RULES.reduce((acc: string[], v): string[] => {
    if (v.condition(req.body))
      return [...acc, v.message];
    return acc;
  }, [])

  if (validationErrors.length >= 1)
    return res.status(400).json({errors: validationErrors})
  
  return await prisma.quote.findUnique({
    where: {
      id: id
    }
  })
  .then(
    async (foundQuote) => {
      if (!foundQuote)
        return res.status(404).end();
      
      const updatedQuote = await prisma.quote.update({
        where: {
          id: id,
        },
        data: {
          content: content,
        },
      });
    
      return res.json(updatedQuote);

    }
  )
};

export default updateQuote;
