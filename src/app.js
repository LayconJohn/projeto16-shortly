import express from "express";
import dotenv from "dotenv";
import chalk from "chalk";
import cors from "cors";
dotenv.config();

import authRouters from "./routers/authRouters.js";

const app = express();

app.use(cors());
app.use(express.json());

//authRouters
app.use(authRouters);

app.listen(process.env.PORT, () => {
    console.log(chalk.bold.green("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~"));
    console.log(chalk.green(`Listening on PORT: ${process.env.PORT}`));
    console.log(chalk.bold.green("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~"));
})