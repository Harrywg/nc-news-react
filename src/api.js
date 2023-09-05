import axios from "axios";

const baseURL = "https://nc-news-server-duxo.onrender.com/api";

const api = axios.create({
  baseURL,
  timeout: 1000,
});

export function getArticles() {
  return api.get("/articles").then(({ data }) => {
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
