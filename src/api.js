const baseUrl = "https://nc-news-server-duxo.onrender.com/api";

export function getArticles() {
  return fetch(baseUrl + "/articles")
    .then((res) => {
      return res.json();
    })
    .then(({ articles }) => {
      return articles;
    })
    .catch((err) => {
      console.log(err);
    });
}
