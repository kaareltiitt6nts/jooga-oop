import express from "express"
import session from "express-session"
import hbs from "express-handlebars"
import "dotenv/config"
import TimeUtils from "./utils/time.js"
import userRouter from "./routes/user.js"
import articleRouter from "./routes/article.js"
import authorRouter from "./routes/author.js"
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import sqlPool from "./utils/db.js"

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PORT = process.env.APP_PORT
const app = new express()

app.set("views", path.join(__dirname, "views"))
app.set("view engine", "hbs")
app.engine("hbs", hbs.engine({
    extname: "hbs",
    defaultLayout: "main",
    layoutsDir: path.join(__dirname, "views", "layouts")
}))

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(express.static("public"))
app.use(session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: true,
    resave: false,
    cookie: {
        maxAge: TimeUtils.getDays(7)
    }
}))

app.use("/", userRouter)
app.use("/", articleRouter)
app.use("/", authorRouter)

app.get("/", (req, res) => {
    const query = "select * from article"

    sqlPool.query(query, (err, result) => {
        if (err) throw err

        res.render("index", {
            articles: result
        })
    })
})

app.get("/article/:slug", (req, res) => {
    const query = `select * from article where slug = "${req.params.slug}"`

    sqlPool.query(query, (err, result) => {
        if (err) throw err

        res.render("article", {
            article: result
        })
    })
})

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})