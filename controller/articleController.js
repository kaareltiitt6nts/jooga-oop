import ArticleModel from "../model/articleModel.js"

const articleModel = new ArticleModel()

class ArticleController {
    async getArticleBySlug(req, res) {
        try {
            const result = await articleModel.findOne("slug", req.params.slug)
            if (result) {
                res.status(200).send(result)
            }
            else {
                res.status(404).send({
                    "message": `Failed to find article: ${req.params.slug}`
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

export default ArticleController