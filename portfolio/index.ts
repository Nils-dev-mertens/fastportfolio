import express, { Express } from "express";
import dotenv from "dotenv";
import path from "path";
import homeRouter from "./routes/home";
import terminalRouter from "./routes/terminal";
import mailRouter from "./routes/mail";

dotenv.config();

const app: Express = express();

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));

app.set("port", process.env.PORT ?? 3000);

// Use routers
app.use("/", homeRouter);
app.use("/", terminalRouter);
app.use("/", mailRouter);

app.use((req, res) => {
    res.send({ status: 404 });
});

app.listen(app.get("port"), () => {
    console.log("Server started on http://localhost:" + app.get("port"));
});