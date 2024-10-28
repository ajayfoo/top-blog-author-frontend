import PropTypes from "prop-types";
import Post from "../Post";
import classes from "./style.module.css";

function PostPage() {
  return (
    <main className={classes["post-page"]}>
      <Post />
    </main>
  );
}

PostPage.propTypes = {
  post: PropTypes.object,
};

export default PostPage;
