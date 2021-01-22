import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchArticleById } from "../../thunk/fetchArticleById";

import { Link } from "react-router-dom";
import { getTime } from "../../utils/mainUtils";

import PersonIcon from "@material-ui/icons/Person";
import ScheduleIcon from "@material-ui/icons/Schedule";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import GradeIcon from "@material-ui/icons/Grade";
import { Link as LinkUi } from "@material-ui/core";


import "./ArticleBlock.css";

export function ArticleBlock({ id }) {
  const dispatch = useDispatch();
  const articles = useSelector((state) => state.entities[id]);

  useEffect(() => {
    if (articles?.status === "success") {
      return;
    }
    dispatch(fetchArticleById(id));
  }, [id]);

  if (!articles || articles.status === "loading") {
    return (
      <div className="article__loading loading">
        <div className="loading__titleContainer"/>
        <div className="loading__infoContainer"/>
      </div>
    );
  }

  if (!articles || articles.status === "failure") {
    return (
      <div className="article__loading loading">
        Error, refresh that page!
      </div>
    );
  }
  
  const { data } = articles;

  return (
    <article className="articleBlock">
      <Link to={`/${id}`} className="articleBlock__link">
        {data.title}
      </Link>
      <div className="articleBlock__info info">
        <span className="info__item">
          <PersonIcon fontSize="small" className="info__icon" />
          <LinkUi href='#' color='inherit'>
            {data.by}
          </LinkUi>
        </span>
        <span className="info__item">
          <ChatBubbleOutlineIcon fontSize="small" className="info__icon" />
          {data.descendants}
        </span>
        <span className="info__item">
          <GradeIcon fontSize="small" className="info__icon" />
          {data.score}
        </span>
        <span className="info__item">
          <ScheduleIcon fontSize="small" className="info__icon" />
          <time>{getTime(data.time)}</time>
        </span>
      </div>
    </article>
  );
}
