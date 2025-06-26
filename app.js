const express = require("express");
const cors = require("cors");
const app = express();

const apiRequest = require("./controllers/api.controllers");
const { getTopics } = require("./controllers/topics.controllers");
const {
  getArticles,
  getArticleByID,
  patchArticleByID,
  postArticle,
} = require("./controllers/articles.controllers");

const {
  postCommentsByArticleByID,
  getCommentsByArticleByID,
  deleteCommentByID,
  patchCommentVotes,
} = require("./controllers/comments.controllers");

const {
  getUsers,
  getUserByUsername,
} = require("./controllers/users.controllers");

app.use(cors());
app.use(express.json());

// Use a base path for the API
const apiBase = "/News-app-BE-api";

app.get(`${apiBase}`, apiRequest);

app.get(`${apiBase}/topics`, getTopics);

app.get(`${apiBase}/articles`, getArticles);
app.post(`${apiBase}/articles`, postArticle);
app.get(`${apiBase}/articles/:article_id`, getArticleByID);
app.patch(`${apiBase}/articles/:article_id`, patchArticleByID);

app.get(`${apiBase}/articles/:article_id/comments`, getCommentsByArticleByID);
app.post(`${apiBase}/articles/:article_id/comments`, postCommentsByArticleByID);

app.patch(`${apiBase}/comments/:comment_id`, patchCommentVotes);
app.delete(`${apiBase}/comments/:comment_id`, deleteCommentByID);

app.get(`${apiBase}/users`, getUsers);
app.get(`${apiBase}/users/:username`, getUserByUsername);

app.all("*", (req, res) => {
  res.status(404).send({ msg: "path not found" });
});

app.use((err, req, res, next) => {
  if (err.code === "23503") {
    res.status(404).send({ msg: "Not found" });
  } else if (err.code === "22P02") {
    res.status(400).send({ msg: "Bad request" });
  } else {
    res.status(err.status || 500).send({ msg: err.msg || "Internal server error" });
  }
});

module.exports = app;
