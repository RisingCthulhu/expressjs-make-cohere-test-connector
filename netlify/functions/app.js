import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import * as middleware from './utils/middleware.js';
import helloRoute from './routes/helloRouter.js';
import philosophersRouter from './routes/philosophers.js';
import gCalendarMockRouter from './routes/g-calendar-mock.js'

const app = express();

// parse json request body
app.use(express.json());

// enable cors
app.use(cors());

// request logger middleware
app.use(morgan('tiny'));

// healthcheck endpoint
app.get('/', (req, res) => {
    res.status(200).send({ status: 'ok' });
});

app.post('/301', (req, res) => {
  res.redirect(307, 'https://webhook.site/a2f457b5-5f51-4c59-a2ea-0f9b36113e2b')
})

app.post('/302', (req, res) => {
  res.redirect(307, 'https://webhook.site/a2f457b5-5f51-4c59-a2ea-0f9b36113e2b')
})

app.post('/307', (req, res) => {
  res.redirect(307, 'https://webhook.site/a2f457b5-5f51-4c59-a2ea-0f9b36113e2b')
})

app.post('/308', (req, res) => {
  res.redirect(308, 'https://webhook.site/a2f457b5-5f51-4c59-a2ea-0f9b36113e2b')
})

app.use('/hello', helloRoute);
app.use('/philosophers', philosophersRouter);
app.use('/gCalendarMock', gCalendarMockRouter);

// custom middleware
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

export default app;
