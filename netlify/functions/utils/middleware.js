import "./logger.js";

export const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: `unknown endpoint` });
};

export const errorHandler = (error, req, res, next) => {
  logger.error(error.message);
  next(error);
};
