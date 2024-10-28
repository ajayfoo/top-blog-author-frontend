import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import classes from "./style.module.css";
import { format } from "date-fns";

function PostPreview({ post }) {
  const updatedAt = format(post.updatedAt, "d MMM yyyy");
  const title = (
    <>
      {post.title.slice(0, 20)}
      {post.title.length > 20 && <>&hellip;</>}
    </>
  );
  const body = (
    <>
      {post.body.slice(0, 20)}
      {post.body.length > 20 && <>&hellip;</>}
    </>
  );
  return (
    <Link className={classes["post-link"]} to={"/posts/" + post.id}>
      <article className={classes["post-preview"]}>
        <p>{updatedAt}</p>
        <div className={classes.content}>
          <h2 className={classes.title}>{title}</h2>
          <p className={classes.body}>{body}</p>
        </div>
        <p className={classes.author}>{post.author.username}</p>
      </article>
    </Link>
  );
}

PostPreview.propTypes = {
  post: PropTypes.object,
};

export default PostPreview;