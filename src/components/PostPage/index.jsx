import PropTypes from "prop-types";
import Post from "../Post";
import classes from "./style.module.css";
import CommentsSection from "../CommentsSection";

function PostPage() {
  return (
    <main className={classes["post-page"]}>
      <Post />
      <CommentsSection />
    </main>
  );
}

PostPage.propTypes = {
  post: PropTypes.object,
};

export default PostPage;
