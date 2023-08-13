const NotFoundError = require("../../errors/not-found");
const UnauthorizedError = require("../../errors/unauthorized");
const articlesService = require("./articles.service");

class ArticlesController {

  async create(req, res, next) {
    // Contrainte: lors de la création d'un article, enregistrez l'utilisateur connecté
    // (autrement dit, l'id de l'utilisateur d'un article créé correspond à l'id de l'utilisateur connecté à l'application
    try {
      const userId = req.user._id;
      const article = await articlesService.create(req.body, userId);
      req.io.emit("article:create", article);
      res.status(201).json(article);
    } catch (err) {
      next(err);
    }
  }

  async update(req, res, next) {
    // Contrainte: Pour la suppression et la mise à jour, l'utilisateur connecté peut modifier/supprimer n'importe
    // quel article mais il doit avoir le rôle d'administrateur
    try {
      const id = req.params.id;
      const user = req.user;

      if (user.role !== "admin") {
        throw new UnauthorizedError(
          "Vous n'êtes pas autoriser à modifier cet article"
        );
      }

      const data = req.body;
      const articleModified = await articlesService.update(
        id,
        data,
        user._id.toString()
      );
      req.io.emit("article:update", { id });
      res.json(articleModified);
    } catch (err) {
      next(err);
    }
  }

  async delete(req, res, next) {
    // Contrainte: Pour la suppression et la mise à jour, l'utilisateur connecté peut modifier/supprimer n'importe
    // quel article mais il doit avoir le rôle d'administrateur
    try {
      const id = req.params.id;
      const user = req.user;

      if (user.role !== "admin") {
        throw new UnauthorizedError(
          "Vous n'êtes pas autoriser à supprimer cet article"
        );
      }

      await articlesService.delete(id, user._id.toString());
      req.io.emit("article:delete", { id });
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new ArticlesController();
