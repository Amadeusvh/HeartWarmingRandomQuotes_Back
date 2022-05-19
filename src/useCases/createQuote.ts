import { Request, Response } from "express";
import { ValidationRule } from "src/type/validationRulesType";
import prisma from "../infra/db/index";

type Body = {
  readonly content: string;
  readonly author: string;
}

const VALIDATION_RULES: ValidationRule<Body>[] = [
  {
    condition: (body) => body.content.length > 280,
    message: "The content of the quote cannot exceed 280 letters"
  },
  {
    condition: (body) => body.author.length > 50,
    message: "The name of the author cannot exceed 50 letters"
  },
  {
    condition: (body) => typeof body.content !== "string",
    message: "Content of the quote must be a string"
  }
]

const createQuote = async (req: Request, res: Response) => {

  const {
    content,
    author
  } = req.body
  
  const validationErrors = VALIDATION_RULES.reduce((acc: string[], v): string[] => {
    if (v.condition(req.body))
      return [...acc, v.message];
    return acc;
  }, [])

  if (validationErrors.length >= 1)
    return res.status(400).json({errors: validationErrors})

  const quote = await prisma.quote.create({
    data: {
      content: content,
      author: author,
    },
  });

  return res.json(quote);

};

export default createQuote;
