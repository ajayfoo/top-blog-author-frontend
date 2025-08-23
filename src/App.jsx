import { Outlet } from "react-router-dom";
import { useFetchUser, usePostsMap } from "./hooks.jsx";
import MainNav from "./components/MainNav";
import classes from "./style.module.css";
import Spinner from "./components/Spinner";
import { UserContext } from "./contexts";

function App() {
  const postsMap = usePostsMap();
  const user = useFetchUser();
  return (
    <div className={classes.app}>
      <MainNav />
      {postsMap ? (
        <UserContext.Provider value={{ user }}>
          <Outlet context={{ postsMap }} />
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
