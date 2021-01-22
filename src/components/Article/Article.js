import { useEffect, useState } from "react";
import { getTime } from "../../utils/mainUtils";
import { CommentBlock } from "../CommendBlock/CommentBlock";
import { useDispatch, useSelector } from "react-redux";
import { fetchArticleById } from "../../thunk/fetchArticleById";
import { Button, Input, Box, Link as LinkUi, CircularProgress } from "@material-ui/core";
import { Link } from "react-router-dom";
import Interweave from "interweave";

import "./Article.css";

export function Article({ match }) {
  const [timeoutId, setTimeoutId] = useState(null);
  const id = match.params.itemId;

  const dispatch = useDispatch();
  const article = useSelector((state) => state.entities[id]);

  useEffect(() => {
    if (article?.status === "success") {
      return;
    }
    dispatch(fetchArticleById(id));
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      dispatch(fetchArticleById(id));
      setTimeoutId(timeoutId);
    }, 60_000);
    return () => clearTimeout(timeoutId);
  }, [timeoutId]);

  function refreshArticle() {
    dispatch(fetchArticleById(id));
  }

  if (!article || article.status === "loading") {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="300px"
      >
        <CircularProgress status="loading"></CircularProgress>
      </Box>
    );
  }

  if (!article || article.status === "failure") {
    return (
      <Box textAlign="center" fontWeight="700">
        Error, refresh that page!
      </Box>
    );
  }

  const { data } = article;

  return (
    <div className="article">
      <Box 
        display="flex" 
        justifyContent="space-between" 
        padding="20px 0"
      >
        <Link 
          to="/" 
          style={{ textDecoration: "none" }}
        >
          <Button variant="outlined" size="small">
            back
          </Button>
        </Link>
        <Button 
          variant="outlined" 
          size="small" 
          onClick={refreshArticle}
        >
          refresh
        </Button>
      </Box>
      <article className="article__inner">
        <header className="article__title">
          <LinkUi 
            href={data.url} 
            color="inherit" 
            target="blank"
          >
            {data.title}
          </LinkUi>
        </header>
        {data.text !== undefined && (
          <section className="article__text">
            <Interweave content={data.text} />
          </section>
        )}
        <footer className="article__info">
          Posted by
          <LinkUi 
            href="#" 
            color="inherit" 
            style={{ padding: "0 5px" }}
          >
            {data.by}
          </LinkUi>
          <time className='article__time'>{getTime(data.time)}</time>
        </footer>
      </article>
      <div className="article__addComment">
        <form className="article__form form">
          <textarea 
            type="text" 
            rows="6" 
            className="form__textarea"
          />
          <Input 
            type="submit" 
            size="small" 
            variant="outlined" 
            disabled
          >
            add comment
          </Input>
        </form>
      </div>
      {data.kids !== undefined && (
        <div className="article__comments">
          {data.kids.map((id) => (
            <CommentBlock id={id} key={id} />
          ))}
        </div>
      )}
    </div>
  );
}
