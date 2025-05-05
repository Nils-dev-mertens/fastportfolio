import express, { Express } from "express";
import dotenv from "dotenv";
import path from "path";
import { queMail } from "./mail";
import { Mail } from "./types";

dotenv.config();

const app: Express = express();

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));

app.set("port", process.env.PORT ?? 3000);

app.get("/", (req, res) => {
    res.render("index", {
        e: ""
    });
});
app.post("/sendmailportfolio", (req, res) => {
    try {
        const ip: string = typeof req.ip == "string" ? req.ip : "";
        const mail: string = typeof req.body.mail == "string" ? req.body.mail : "";
        const text: string = typeof req.body.message == "string" ? req.body.message : "";
        if ((ip == "") || (mail == "") || (text == "")) {
            return sendinternalerror();
        }
        const go: Boolean = queMail(ip, { mailsender: mail, text: text });
        if(!go){
            return sendinternalerror();
        }
        res.redirect("/");

    } catch (error) {
        return sendinternalerror();
    }
    function sendinternalerror() {
        res.render("index", {
            e: "internal server error, try later or just send an email, directly"
        })
    }
});

app.use((req, res) => {
    res.send({ status: 404 });
});

app.listen(app.get("port"), () => {
    console.log("Server started on http://localhost:" + app.get("port"));
});