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

import styles from './ArticleBlock.module.css';

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
      <div className={styles.loading}>
        <div className={styles.titleContainer}/>
        <div className={styles.infoContainer}/>
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
    <article className={styles.main}>
      <Link to={`/${id}`} className={styles.link}>
        {data.title}
      </Link>
      <div className={styles.info}>
        <span className={styles.item}>
          <PersonIcon fontSize="small" className="info__icon" className={styles.icon}/>
          <LinkUi href='#' color='inherit'>
            {data.by}
          </LinkUi>
        </span>
        <span className={styles.item}>
          <ChatBubbleOutlineIcon fontSize="small" className="info__icon" className={styles.icon}/>
          {data.descendants}
        </span>
        <span className={styles.item}>
          <GradeIcon fontSize="small" className="info__icon" className={styles.icon}/>
          {data.score}
        </span>
        <span className={styles.item}>
          <ScheduleIcon fontSize="small" className="info__icon" className={styles.icon}/>
          <time>{getTime(data.time)}</time>
        </span>
      </div>
    </article>
  );
}
