import axios from "axios";

const baseURL = "https://nc-news-server-duxo.onrender.com/api";

const api = axios.create({
  baseURL,
  timeout: 3000,
});

export function getArticles(params) {
  return api.get("/articles", { params }).then(({ data }) => {
    return data.articles;
  });
}

export function getArticleById(id) {
  return api.get("/articles/" + id).then(({ data }) => {
    return data.article[0];
  });
}

export function getUserByUsername(username) {
  return api.get("/users/" + username).then(({ data }) => {
    return data.users[0];
  });
}

export function getArticleCommentsById(id) {
  return api.get("/articles/" + id + "/comments").then(({ data }) => {
    return data.comments;
  });
}

export function updateArticleVotes(id, inc_votes) {
  return api.patch("/articles/" + id, { inc_votes });
}

export function postCommentByArticleId(id, body) {
  return api.post("/articles/" + id + "/comments", body);
}

export function getUserData(username) {
  return api.get("/users/" + username).then(({ data }) => {
    return data.user;
  });
}

export function getTopics() {
  return api.get("/topics").then(({ data }) => {
    return data.topics;
  });
}

export function deleteComment(id) {
  return api.delete("/comments/" + id);
}

export function postArticle(body) {
  return api.post("/articles", body);
}

export function deleteArticle(id) {
  return api.delete("/articles/" + id);
}

export function getUsers() {
  return api.get("/users").then(({ data }) => data);
}
