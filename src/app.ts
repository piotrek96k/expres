import express, { Express, NextFunction, Request, Response } from "express";
import boardsRouter from "./boards";
import bodyParser = require("body-parser");

const app: Express = express();

const jsonParser = bodyParser.json();

app.use(jsonParser);

app.get('/', (_: Request, res: Response) => {
    res.send('Hello World!!!');
});

app.use('/person', (req: Request, _: Response, next: NextFunction) => {
    console.log(`Person method: ${req.method}`);
    next();
})

app.use('/boards', boardsRouter)

app.listen(3000, () => {
    console.log('It\' working');
});