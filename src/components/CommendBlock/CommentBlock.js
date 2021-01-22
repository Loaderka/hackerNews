import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTime } from "../../utils/mainUtils";
import { fetchArticleById } from "../../thunk/fetchArticleById";
import { Box, Button, Link, CircularProgress } from "@material-ui/core";
import Interweave from "interweave";

import "./CommentBlock.css";

export function CommentBlock({ id }) {
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();
  const comment = useSelector((state) => state.entities[id]);

  function clickHandler() {
    setOpen((prev) => !prev);
  }

  useEffect(() => {
    if (comment?.status === "success") {
      return;
    }
    dispatch(fetchArticleById(id));
  }, []);

  if (!comment || comment.status === "loading") {
    return (
      <Box 
        display='flex'
        justifyContent='center'
        alignItems='center'
        height='125px'
      >
        <CircularProgress status='loading'></CircularProgress>
      </Box>
    );
  }

  if (!comment || comment.status === "failure") {
    return (
      <Box textAlign="center" fontWeight="700">
        Error, refresh that page!
      </Box>
    );
  }
  
  const { data } = comment;

  if (data.deleted) {
    return null;
  }

  return (
    <div className="comment">
      <article className="comment__main">
        <header className="comment__header">
          <Link href="#">{data.by}</Link>
          <time className="comment__date">{getTime(data.time)}</time>
        </header>
        <section className="comment__text">
          <Interweave content={data.text} />
        </section>
        {data.kids !== undefined && !open && (
          <footer className="comment__footer">
            <Button
              variant="outlined"
              size="small"
              onClick={clickHandler}
              style={{ marginRight: "20px" }}
            >
              {data.kids.length === 1
                ? `${data.kids.length} answer`
                : `${data.kids.length} answers`}
            </Button>
            <Button 
              variant="outlined" 
              size="small" 
              disabled
            >
              reply
            </Button>
          </footer>
        )}
      </article>
      {open && (
        <div className="comment__subcomments">
          {comment.data.kids.map(comment => (
            <CommentBlock id={comment} />
          ))}
        </div>
      )}
    </div>
  );
}
