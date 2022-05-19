import { Router } from "express";
import getRandomQuotes from "../useCases/getRandomQuote";
import getQuotes from "../useCases/getQuotes";
import getQuote from "../useCases/getQuote";
import createQuote from "../useCases/createQuote";
import updateQuote from "../useCases/updateQuote";
import deleteQuote from "../useCases/deleteQuote";

const router = Router();

router.get('/quote', getRandomQuotes);

router.get('/quotes', getQuotes);

router.get('/quote/:id', getQuote);

router.post('/quote', createQuote);

router.put('/quote', updateQuote);

router.delete('/:id', deleteQuote);

export default router;
