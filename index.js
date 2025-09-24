import express from "express"
import ArticleController from "./controller/articleController.js"
import AuthorController from "./controller/authorController.js"
import session from "express-session"
import "dotenv/config"
import TimeUtils from "./utils/time.js"

const PORT = process.env.APP_PORT
const app = new express()

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

const articleController = new ArticleController()
const authorController = new AuthorController()

app.get("/author/:id", (req, res) => authorController.getAuthorById(req, res))

app.get("/article/:slug", (req, res) => articleController.getArticleBySlug(req, res))
app.post("/article/create", (req, res) => articleController.createNewArticle(req, res))
app.put("/article/edit/:id", (req, res) => articleController.editArticle(req, res))
app.delete("/article/delete/:id", (req, res) => articleController.deleteArticle(req, res))

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})