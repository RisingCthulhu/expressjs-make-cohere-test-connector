import { Router } from "express";

const routes = Router();

const values = [...Array(6400)].map(() => ({ value: Math.floor(Math.random() * 100000) }));

routes.get("/values", async (req, res) => {
  const perPage = Number.parseInt(req.query.perPage, 10) || 50;
  const page = Number.parseInt(req.query.cursor, 10) || 1;
  const currentPageValues = values.slice(perPage * (page - 1), perPage * page);
  const nextPage = page + 1;
  const nextPageValues = values.slice(perPage * (nextPage - 1), perPage * nextPage);
  
  res.status(200).send({
    values: values.slice(perPage * (page - 1), perPage * page),
    cursor: nextPageValues.length !== 0 ? (page + 1).toString(10) : undefined
  });
});

export default routes;
