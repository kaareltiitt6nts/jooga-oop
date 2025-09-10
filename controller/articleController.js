import BaseController from "./base.js"

class ArticleController extends BaseController {
    constructor(model) {
        super(model)
    }

    async findBySlug(req, res) {
        try {
            const result = await this.model.findOne("slug", req.params.slug)
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