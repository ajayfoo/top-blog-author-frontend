import { useLoaderData } from "react-router-dom";
import PostPreview from "../PostPreview";
import classes from "./style.module.css";

function PostsPage() {
  const posts = useLoaderData();
  if (!posts) return null;
  return (
    <main className={classes["posts-page"]}>
      {posts.map((p) => (
        <PostPreview key={p.id} post={p} />
      ))}
    </main>
  );
}

export default PostsPage;
