import express from "express";
import cors from "cors";
import morgan from "morgan";
import { URL } from "node:url";

import * as middleware from "./utils/middleware.js";
import helloRoute from "./routes/helloRouter.js";
import philosophersRouter from "./routes/philosophers.js";
import gCalendarMockRouter from "./routes/g-calendar-mock.js";

const app = express();

// parse json request body
app.use(express.json());

// enable cors
app.use(cors());

// request logger middleware
app.use(morgan("tiny"));

// healthcheck endpoint
app.get("/", (req, res) => {
    res.status(200).send({ status: "ok" });
});

const redirectHandler = (status) => (req, res) => {
    const { redirectUrl } = req.body;

    if (!redirectUrl) {
        res.status(400).send("redirectUrl must be specified.");
    }

    if (!URL.canParse(redirectUrl)) {
        res.status(400).send("redirectUrl is not valid URL.");
    }

    res.redirect(status, redirectUrl);
};

app.post("/301", redirectHandler(301));
app.post("/302", redirectHandler(302));
app.post("/307", redirectHandler(307));
app.post("/308", redirectHandler(308));

const fakeRedirectHandler = (status) => (req, res) => {
    res.status(status).send("Fake redirect.");
};

app.post("/301-fake", fakeRedirectHandler(301));
app.post("/302-fake", fakeRedirectHandler(302));
app.post("/307-fake", fakeRedirectHandler(307));
app.post("/308-fake", fakeRedirectHandler(308));

app.get("/iso-8859-1-charset-utf8", (req, res) => {
    res.set("Content-Type", "application/json; charset=utf-8");
    res.send({
        charset: `!"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\]^_\`abcdefghijklmnopqrstuvwxyz{|}~€‚ƒ„…†‡ˆ‰Š‹ŒŽ‘’“”•–—˜™š›œžŸ ¡¢£¤¥¦§¨©ª«¬­®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõö÷øùúûüýþÿ`,
    });
});
app.get("/iso-8859-1-charset-latin1", (req, res) => {
    res.set("Content-Type", "application/json; charset=iso-8859-1");
    res.send({
        charset: `!"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\]^_\`abcdefghijklmnopqrstuvwxyz{|}~€‚ƒ„…†‡ˆ‰Š‹ŒŽ‘’“”•–—˜™š›œžŸ ¡¢£¤¥¦§¨©ª«¬­®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõö÷øùúûüýþÿ`,
    });
});

app.use("/hello", helloRoute);
app.use("/philosophers", philosophersRouter);
app.use("/gCalendarMock", gCalendarMockRouter);

// custom middleware
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

export default app;
