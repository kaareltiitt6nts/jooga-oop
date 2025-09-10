import AuthorModel from "../model/authorModel.js"
import ArticleModel from "../model/articleModel.js"

const authorModel = new AuthorModel()
const articleModel = new ArticleModel()

class AuthorController {
    async getAuthorById(req, res) {
        try {
            const author = await authorModel.findById(req.params.id)
            const articles = await articleModel.findMany("author_id", author.id)

            author["articles"] = articles

            if (author) {
                res.status(200).send(author)
            }
            else {
                res.status(404).send({
                    "message": `Failed to find author: ${req.params.id}`
                })
            }
        } catch (error) {
            res.status(500).send({
                "message": `Internal server error.`
            })

            throw Error(error)
        }
    }
}

export default AuthorController