import express from "express"
import AuthorController from "../controller/authorController.js"

const authorRouter = express.Router()
const authorController = new AuthorController()

authorRouter.get("/author/:id", (req, res) => authorController.getAuthorById(req, res))

export default authorRouter