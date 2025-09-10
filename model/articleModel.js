import BaseSqlModel from "./base.js";

class ArticleModel extends BaseSqlModel {
    constructor() {
        super("article")
    }

    async findBySlug(slug) {
        return await super.findOne("slug", slug)
    }
}

export default ArticleModel