import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import classes from "./style.module.css";
import { format } from "date-fns";
import PublishUnpublishButton from "../PublishUnpublishButton";

const POST_PREVIEW_TITLE_MAX_LENGTH = 40;
const POST_PREVIEW_BODY_MAX_LENGTH = 60;

const formattedBody = (quillContents) => {
  const parsedBody = JSON.parse(quillContents).ops;
  let bodyContent = "";
  for (const ele of parsedBody) {
    const content = ele.insert;
    if (typeof content === "string") {
      bodyContent += content;
    } else if (content.image) {
      bodyContent += "🖼️";
    } else if (content.divider) {
      bodyContent += "—";
    } else {
      bodyContent += "?";
    }
    if (bodyContent.length > POST_PREVIEW_BODY_MAX_LENGTH) {
      break;
    }
  }
  return (
    <>
      {bodyContent.slice(0, POST_PREVIEW_BODY_MAX_LENGTH)}
      {bodyContent.length > POST_PREVIEW_BODY_MAX_LENGTH && <>&hellip;</>}
    </>
  );
};

function PostPreview({ post }) {
  const updatedAt = format(post.updatedAt, "d MMM yyyy");
  const body = formattedBody(post.body);
  const title = (
    <>
      {post.title.slice(0, POST_PREVIEW_TITLE_MAX_LENGTH)}
      {post.title.length > POST_PREVIEW_TITLE_MAX_LENGTH && <>&hellip;</>}
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
        <footer className={classes.footer}>
          <PublishUnpublishButton post={post} />
        </footer>
      </article>
    </Link>
  );
}

PostPreview.propTypes = {
  post: PropTypes.object,
};

export default PostPreview;
