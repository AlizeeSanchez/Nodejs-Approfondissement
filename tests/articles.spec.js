const request = require("supertest");
const { app } = require("../server");
const jwt = require("jsonwebtoken");
const config = require("../config");
const mockingoose = require("mockingoose");
const User = require("../api/users/users.model");
const Article = require("../api/articles/articles.model");
const articlesService = require("../api/articles/articles.service");

describe("tester API articles", () => {
  let token;
  const ID = "fake";
  const MOCK_USER_DATA_ONE = {
    _id: ID,
    name: "ana",
    email: "nfegeg@gmail.com",
    password: "azertyuiop",
    role: "admin"
  }

  const MOCK_ARTICLE_DATA_ONE = {
    _id: ID,
    title: "Visiplus",
    content: "Digital Learning",
    state: 'draft'
  }
  const MOCK_ARTICLE_DATA = [MOCK_ARTICLE_DATA_ONE];
  const MOCK_ARTICLE_DATA_CREATED = {
    title: "test",
    content: "ceci est un article test"
  };

  const MOCK_ARTICLE_DATA_UPDATED = {
    title: "nouveau test",
    content: "ceci est un nouvel article test"
  };

  beforeEach(() => {
    token = jwt.sign({ userId: ID }, config.secretJwtToken);
    
    mockingoose(User).toReturn(MOCK_USER_DATA_ONE, "findOne");
    mockingoose(Article).toReturn(MOCK_ARTICLE_DATA, "find");
    mockingoose(Article).toReturn(MOCK_ARTICLE_DATA_ONE, "findOne");
    mockingoose(Article).toReturn(MOCK_ARTICLE_DATA_CREATED, "save");
    mockingoose(Article).toReturn(MOCK_ARTICLE_DATA_UPDATED, "findOneAndUpdate");
  });

  test("[Articles] Create Article", async () => {
    const res = await request(app)
      .post("/api/articles")
      .send(MOCK_ARTICLE_DATA_CREATED)
      .set("x-access-token", token);
    expect(res.status).toBe(201);
    expect(res.body.title).toBe(MOCK_ARTICLE_DATA_CREATED.title);
    expect(res.body.content).toBe(MOCK_ARTICLE_DATA_CREATED.content);
  });

  test("[Articles] Update Article", async () => {
    const res = await request(app)
      .put("/api/articles/fake")
      .send(MOCK_ARTICLE_DATA_UPDATED)
      .set("x-access-token", token);
    expect(res.status).toBe(200);
    expect(res.body.title).toBe(MOCK_ARTICLE_DATA_UPDATED.title);
    expect(res.body.content).toBe(MOCK_ARTICLE_DATA_UPDATED.content);
  });

  test("[Articles] Delete Article", async () => {
    const res = await request(app)
      .delete("/api/articles/fake")
      .set("x-access-token", token);
    expect(res.status).toBe(204);
    expect(res.body).toStrictEqual({});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });
});
