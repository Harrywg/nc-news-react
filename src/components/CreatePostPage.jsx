import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/User";
import { useNavigate } from "react-router-dom";
import "../css/CreatePost.css";
import { getTopics, postArticle } from "../api";
export default function CreatePostPage() {
  const [topics, setTopics] = useState([]);
  const { username } = useContext(UserContext);

  const [formData, setFormData] = useState({
    title: "",
    topic: "",
    article_image_url: "",
    author: username,
    body: "",
  });

  const [errors, setErrors] = useState([]);
  const [isPostError, setIsPostError] = useState(false);
  const [isPosting, setIsPosting] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    getTopics().then(setTopics);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitForm = (e) => {
    setErrors([]);
    e.preventDefault();

    const { title, topic, article_img_url, author, body } = formData;

    const urlRegex =
      /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi;

    const currentErrors = [];

    if (title.length < 10) {
      currentErrors.push("Title must be longer than 10 characters");
    }

    if (topic === "") {
      currentErrors.push("Please select a topic");
    }

    if (!urlRegex.test(article_img_url)) {
      currentErrors.push("Please insert a valid URL in Image URL");
    }

    if (body.length < 20) {
      currentErrors.push("Post must be longer than 20 characters");
    }

    setErrors(currentErrors);
    if (!currentErrors.length) {
      setIsPosting(true);
      postArticle(formData)
        .then(({ data }) => {
          const id = data.article.article_id;
          navigate("/articles/" + id);
        })
        .catch((err) => {
          setIsPostError(true);
          setIsPosting(false);
        });
    }
  };

  if (isPosting) {
    return (
      <main>
        <h2>Posting...</h2>
      </main>
    );
  }

  return (
    <main>
      <h2>Create Post</h2>
      {isPostError ? <p className="form-error">Something Went Wrong</p> : <></>}
      <form onSubmit={submitForm} id="create-post-form">
        <input
          maxLength="100"
          onChange={handleChange}
          name="title"
          placeholder="Title"
        ></input>
        <select
          onChange={handleChange}
          name="topic"
          defaultValue="Select Topic"
        >
          <option disabled>Select Topic</option>
          {topics.map(({ slug }) => {
            return <option key={slug}>{slug}</option>;
          })}
        </select>
        <input
          onChange={handleChange}
          name="article_img_url"
          id="image-url-input"
          placeholder="Image Url"
        ></input>
        <textarea
          onChange={handleChange}
          name="body"
          placeholder="Write Post"
        />
        <button type="submit">Submit</button>
      </form>
      {errors.map((err) => (
        <p key={err} className="form-error">
          {err}
        </p>
      ))}
    </main>
  );
}
