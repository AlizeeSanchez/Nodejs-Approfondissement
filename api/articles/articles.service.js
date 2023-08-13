const Article = require("./articles.model");

class ArticleService {

  async getArticlesByUserId(userId) {
    return await Article.find({ user: userId }).populate("user", "-password");  
  }

  async create(data, userId) {
    const article = new Article(data);
    article.user = userId;
    return await article.save();
  }

  async update(id, data) {
    return await Article.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id) {
    return await Article.deleteOne({ _id: id });
  }

}

module.exports = new ArticleService();
