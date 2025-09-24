import express from "express"
import ArticleController from "../controller/articleController.js"

const articleRouter = express.Router()
const articleController = new ArticleController()

articleRouter.get("/article/:slug", (req, res) => articleController.getArticleBySlug(req, res))
articleRouter.post("/article/create", (req, res) => articleController.createNewArticle(req, res))
articleRouter.put("/article/edit/:id", (req, res) => articleController.editArticle(req, res))
articleRouter.delete("/article/delete/:id", (req, res) => articleController.deleteArticle(req, res))

export default articleRouter