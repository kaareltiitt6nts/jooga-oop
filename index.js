import sqlPool from "./utils/db.js"
import "dotenv/config"
import express from "express"
import ArticleModel from "./model/articleModel.js"

const PORT = process.env.APP_PORT
const app = new express()
app.use(express.json())

const articleModel = new ArticleModel();

app.get("/:slug", async (req, res) => {
    const result = await articleModel.findBySlug(req.params.slug)
    res.send(result)
})

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})