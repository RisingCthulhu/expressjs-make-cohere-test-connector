import { Router } from "express";

const routes = Router();

const values = [...Array(6400)].map(() => ({ value: Math.floor(Math.random() * 100) }));

routes.get("/values", async (req, res) => {
  const perPage = Number.parseInt(req.perPage, 10) || 50;
  const page = Number.parseInt(req.cursor, 10) || 1;
  
  res.status(200).send({
    values: values.slice(perPage * (page - 1), perPage * page),
    cursor: (page + 1).toString(10)
  });
});

export default routes;
