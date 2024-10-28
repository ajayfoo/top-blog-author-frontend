import { useLoaderData } from "react-router-dom";

function PostsPage() {
  const posts = useLoaderData();
  if (!posts) return null;
  return <main>No. of posts: {posts.length}</main>;
}

export default PostsPage;
