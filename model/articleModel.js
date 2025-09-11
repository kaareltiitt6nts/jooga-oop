import BaseSqlModel from "./base.js";

class ArticleModel extends BaseSqlModel {
    constructor() {
        super("article")
    }

    async create(article) {
        const articleId = await super.create(article)
        return articleId
    }
}

export default ArticleModel