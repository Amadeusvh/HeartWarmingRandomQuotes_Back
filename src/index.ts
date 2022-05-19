import Express from "express";
import router from "./router/routes";
import cors from "cors";

const app = Express();

app.use(cors())

app.use(Express.json());

app.use(router);

app.listen( "3030", () => {
  console.log('Listening on port 3030');
})
