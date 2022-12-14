import express from "express";
import dotenv from "dotenv";
import chalk from "chalk";
import cors from "cors";
dotenv.config();

import authRouters from "./routers/authRouters.js";
import urlsRouters from "./routers/urlsRouters.js";
import usersRouters from "./routers/usersRouters.js";

const app = express();

app.use(cors());
app.use(express.json());

//authRouters
app.use(authRouters);

//urlsRouters
app.use(urlsRouters);

//urlRouters
app.use(usersRouters);

app.listen(process.env.PORT, () => {
    console.log(chalk.bold.green("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~"));
    console.log(chalk.green(`Listening on PORT: ${process.env.PORT}`));
    console.log(chalk.bold.green("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~"));
})