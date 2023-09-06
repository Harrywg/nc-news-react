import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUserByUsername } from "../api";
import ProfilePicture from "./common/ProfilePicture";
import likeImg from "../assets/like.png";
import commentImg from "../assets/chat.png";
export default function ArticleCard(props) {
  const {
    title,
    article_id,
    topic,
    author,
    article_img_url,
    votes,
    article,
    comment_count,
  } = props.article;

  const { path } = props;

  return (
    <Link to={`${path}${article_id}`} className="article-card">
      <div
        className="article-card_background-el"
        style={{ backgroundImage: `url(${article_img_url})` }}
      ></div>
      <div className="article-card_text-wrap">
        <p>
          <ProfilePicture author={author} />
          {author}
        </p>
        <div className="article-card_header-wrap">
          <h3>{title} </h3>
          <span className="article-card_topic tag">{topic}</span>
        </div>
      </div>
      <figure className="article-card_img-wrap">
        <div className="article-card_votes-wrap">
          <span className="article-card_votes">{votes}</span>{" "}
          <img className="icon" src={likeImg} />
          <span>{comment_count}</span>
          <img className="icon" src={commentImg} />
        </div>
        <img className="article-card_img" src={article_img_url} />
      </figure>
    </Link>
  );
}
