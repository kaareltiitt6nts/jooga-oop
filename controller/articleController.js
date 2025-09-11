import ArticleModel from "../model/articleModel.js"

const articleModel = new ArticleModel()

class ArticleController {
    async getAllArticles(req, res) {
        try {
            const results = await articleModel.getAll()
            if (results) {
                res.status(200).send(result)
            }
            else {
                res.status(404).send({
                    "message": `Failed to find any articles`
                })
            }
        } catch (error) {
            res.status(500).send({
                "message": `Internal server error.`
            })

            throw Error(error)
        }
    }

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

    async editArticle(req, res) {
        try {
            const newArticleId = await articleModel.edit(req.params.id, {
                name: req.body.name,
                slug: req.body.slug,
                image: req.body.image,
                body: req.body.body,
                published: new Date().toISOString().slice(0, 10),
                author_id: req.body.author_id
            })

            if (newArticleId) {
                res.status(201).send({
                    message: "Article edited successfully.",
                    article_id: newArticleId
                })
            }
            else {
                res.status(500).send({
                    "message": `Failed to create article.`
                })
            }
        } catch (error) {
            res.status(500).send({
                "message": `Internal server error.`
            })

            throw Error(error)
        }
    }

    async createNewArticle(req, res) {
        try {
            const newArticleId = await articleModel.create({
                name: req.body.name,
                slug: req.body.slug,
                image: req.body.image,
                body: req.body.body,
                published: new Date().toISOString().slice(0, 10),
                author_id: req.body.author_id
            })

            if (newArticleId) {
                res.status(201).send({
                    message: "Article created successfully.",
                    article_id: newArticleId
                })
            }
            else {
                res.status(500).send({
                    "message": `Failed to create article.`
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