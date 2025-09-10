import sqlPool from "./utils/db.js"
import "dotenv/config"
import express from "express"
import ArticleModel from "./model/articleModel.js"
import ArticleController from "./controller/articleController.js"

const PORT = process.env.APP_PORT
const app = new express()
app.use(express.json())

const articleModel = new ArticleModel();
const articleController = new ArticleController(articleModel);

app.get("/", async (req, res) => {
    res.send("Hi!")
})

app.get("/article/:slug", (req, res) => {
    articleController.findBySlug(req, res)
})

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})