import { Outlet } from "react-router-dom";
import { useFetchData, useFetchUser } from "./hooks.jsx";
import MainNav from "./components/MainNav";
import classes from "./style.module.css";
import Spinner from "./components/Spinner";
import { UserContext } from "./contexts";

function App() {
  const [posts, setPosts] = useFetchData(
    import.meta.env.VITE_API_URL + "/posts"
  );
  const user = useFetchUser();

  const postsMap = new Map();
  posts?.forEach((p) => {
    postsMap.set(p.id, p);
  });
  const addPost = (post) => {
    const newPosts = structuredClone(posts);
    newPosts.push(post);
    setPosts(newPosts);
  };
  const replacePost = (post) => {
    const clonedPosts = structuredClone(posts);
    const targetPostIndex = clonedPosts.findIndex((p) => p.id === post.id);
    if (targetPostIndex !== -1) {
      clonedPosts[targetPostIndex] = post;
    }
    setPosts(clonedPosts);
  };
  return (
    <div className={classes.app}>
      <MainNav />
      {posts ? (
        <UserContext.Provider value={{ user }}>
          <Outlet context={{ postsMap, addPost, replacePost }} />
        </UserContext.Provider>
      ) : (
        <div className={classes.center}>
          <Spinner />
        </div>
      )}
    </div>
  );
}

export default App;
