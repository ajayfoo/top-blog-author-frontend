import PropTypes from "prop-types";
import Post from "../Post";
import classes from "./style.module.css";
import CommentsSection from "../CommentsSection";
import { useOutletContext, useParams } from "react-router-dom";
import { usePageTitle } from "../../../../top-blog-viewer-frontend/src/hooks";

function PostPage() {
  const { postsMap } = useOutletContext();
  const { id } = useParams();
  const post = postsMap.get(parseInt(id));
  usePageTitle(post.title);
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
