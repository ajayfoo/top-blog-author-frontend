import { Outlet, useLocation } from "react-router-dom";
import { useFetchData, useFetchUser, usePageTitle } from "./hooks.jsx";
import MainNav from "./components/MainNav";
import classes from "./style.module.css";
import Spinner from "./components/Spinner";
import { UserContext } from "./contexts";
import "./App.css";

function App() {
  usePageTitle("TOP Blog");
  const [posts, setPosts] = useFetchData(
    import.meta.env.VITE_API_URL + "/posts"
  );
  const user = useFetchUser();
  const location = useLocation();

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
  const isEditPostPath = /\/posts\/[0-9]*\/edit/.test(location?.pathname);
  const giveMainNavStaticPosition =
    location?.pathname === "/posts/new" || isEditPostPath;
  const appClassName = `${classes.app} ${giveMainNavStaticPosition ? "" : classes["app-with-sticky-nav"]}`;
  return (
    <div className={appClassName}>
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
