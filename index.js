import sqlPool from "./utils/db.js"
import "dotenv/config"
import express from "express"
import ArticleController from "./controller/articleController.js"
import AuthorController from "./controller/authorController.js"

const PORT = process.env.APP_PORT
const app = new express()
app.use(express.json())

const articleController = new ArticleController()
const authorController = new AuthorController()

app.get("/", async (req, res) => {
    res.send("Hi!")
})

app.get("/article/:slug", (req, res) => {
    articleController.getArticleBySlug(req, res)
})

app.get("/author/:id", (req, res) => {
    authorController.getAuthorById(req, res)
})

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})