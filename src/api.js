const baseUrl = "https://nc-news-server-duxo.onrender.com/api";

export function getArticles() {
  return fetch(baseUrl + "/articles")
    .then((res) => res.json())
    .then(({ articles }) => {
      return articles;
    });
}

export function getArticleById(id) {
  return fetch(baseUrl + "/articles/" + id)
    .then((res) => res.json())
    .then(({ article }) => {
      return article[0];
    });
}

export function getUserByUsername({ username }) {
  return fetch(baseUrl + "/users/" + username)
    .then((res) => res.json())
    .then(({ users }) => {
      return users[0];
    });
}
