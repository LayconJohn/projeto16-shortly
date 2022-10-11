import express from "express";
import dotenv from "dotenv";
import chalk from "chalk";
import cors from "cors";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/teste", (req, res) => {
    res.status(200).send("Tudo certo!")
});

app.listen(process.env.PORT, () => {
    console.log(chalk.bold.green("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~"));
    console.log(chalk.green(`Listening on PORT: ${process.env.PORT}`));
    console.log(chalk.bold.green("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~"));
})