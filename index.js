import express from "express"
import ArticleController from "./controller/articleController.js"
import AuthorController from "./controller/authorController.js"

const PORT = process.env.APP_PORT
const app = new express()
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(express.static("public"))

const articleController = new ArticleController()
const authorController = new AuthorController()

app.get("/author/:id", (req, res) => authorController.getAuthorById(req, res))

app.get("/article/:slug", (req, res) => articleController.getArticleBySlug(req, res))
app.post("/article/create", (req, res) => articleController.createNewArticle(req, res))
app.put("/article/edit/:id", (req, res) => articleController.editArticle(req, res))

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})