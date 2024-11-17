import PropTypes from "prop-types";
import classes from "./style.module.css";
import { format } from "date-fns";
import { useOutletContext, useParams } from "react-router-dom";
import { useEffect, useRef } from "react";
import Quill from "quill/core";

function Post() {
  const quillRef = useRef(null);
  const bodyContainerRef = useRef(null);
  const { postsMap } = useOutletContext();
  const { id } = useParams();
  const post = postsMap.get(parseInt(id));
  const updatedAt = format(post.updatedAt, "d MMM yyyy");

  useEffect(() => {
    const container = bodyContainerRef.current;
    quillRef.current = new Quill(container);
    quillRef.current.setContents(JSON.parse(post.body));
    quillRef.current.disable();
    return () => {
      quillRef.current = null;
      container.textContent = "";
    };
  }, []);

  return (
    <section className={classes.post}>
      <header>
        <h1 className={classes.title}>{post.title}</h1>
        <p className={classes["updated-at"]}>
          Last updated on <time dateTime={post.updatedAt}>{updatedAt}</time>
        </p>
      </header>
      <div className={classes.body} ref={bodyContainerRef}></div>
    </section>
  );
}

Post.propTypes = {
  post: PropTypes.object,
};

export default Post;
