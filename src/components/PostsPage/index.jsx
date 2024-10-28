import { useOutletContext } from "react-router-dom";
import PostPreview from "../PostPreview";
import classes from "./style.module.css";

function PostsPage() {
  const { postsMap } = useOutletContext();
  const postPreviews = [];
  for (const post of postsMap.values()) {
    postPreviews.push(<PostPreview key={post.id} post={post} />);
  }
  return <main className={classes["posts-page"]}>{postPreviews}</main>;
}

export default PostsPage;
