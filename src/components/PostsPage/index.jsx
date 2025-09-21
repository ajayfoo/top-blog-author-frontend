import { Link, useOutletContext } from "react-router-dom";
import PostPreview from "../PostPreview";
import classes from "./style.module.css";
import PlusIcon from "../Icons/PlusIcon.jsx";
import { usePageTitle } from "../../../../top-blog-viewer-frontend/src/hooks.jsx";

const CreatePostButton = () => {
  return (
    <Link className={classes["create-post-button"]} to="/posts/new">
      <PlusIcon className={classes.icon} />
      <span className={classes["create-post-text"]}>Create post</span>
    </Link>
  );
};

function PostsPage() {
  usePageTitle("Posts");
  const { postsMap } = useOutletContext();
  const postPreviews = [];
  for (const post of postsMap.values()) {
    postPreviews.push(<PostPreview key={post.id} post={post} />);
  }
  return (
    <main className={classes["posts-page"]}>
      <CreatePostButton />
      <div className={classes["posts"]}>{postPreviews}</div>
    </main>
  );
}

export default PostsPage;
