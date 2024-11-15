import PropTypes from "prop-types";
import { useContext, useEffect, useState, useSyncExternalStore } from "react";
import { UserContext } from "./contexts.jsx";
import { getUserIfAuthorizedElseNull, UserStatus } from "./utils.js";

const useFetchData = (url) => {
  const [data, setData] = useState(null);
  useEffect(() => {
    const controller = new AbortController();
    const auth = localStorage.getItem("auth");
    const fetchAndSetPosts = async () => {
      try {
        const res = await fetch(url, {
          headers: {
            Authorization: auth,
          },
          signal: controller.signal,
          mode: "cors",
        });
        const d = await res.json();
        setData(d);
      } catch (err) {
        if (err.name === "AbortError") return;
        console.error(err);
      }
    };
    fetchAndSetPosts();
    return () => {
      controller.abort();
    };
  }, [url]);
  return [data, setData];
};
useFetchData.propTypes = {
  url: PropTypes.string,
};

const usePostsMap = () => {
  const [posts] = useFetchData(import.meta.env.VITE_API_URL + "/posts");
  if (!posts) {
    return null;
  }
  const postsMap = new Map();
  posts.forEach((p) => {
    postsMap.set(p.id, p);
  });
  return postsMap;
};

const useComments = (postId) => {
  const [comments, setComments] = useFetchData(
    import.meta.env.VITE_API_URL + "/posts/" + postId + "/comments"
  );
  return [comments, setComments];
};

useComments.propTypes = {
  postId: PropTypes.number,
};

const useLocalStorage = (key) => {
  const store = {
    subscribe(listener) {
      window.addEventListener("storage", listener);
      return () => {
        window.removeEventListener("storage", listener);
      };
    },
    getSnapshot() {
      return localStorage.getItem(key);
    },
  };
  const value = useSyncExternalStore(store.subscribe, store.getSnapshot);
  return value;
};

const useFetchUser = () => {
  const [user, setUser] = useState({ status: UserStatus.CHECKING });
  useEffect(() => {
    const controller = new AbortController();
    const fetchUserAndSetIt = async () => {
      const user = await getUserIfAuthorizedElseNull(controller.signal);
      if (user) {
        setUser({ status: UserStatus.AUTHORIZED, username: user.username });
      } else {
        setUser({ status: UserStatus.UNAUTHORIZED });
      }
    };
    fetchUserAndSetIt();
    return () => {
      controller.abort();
    };
  }, []);
  return user;
};

const useUser = () => {
  const user = useContext(UserContext);
  return user;
};

export { usePostsMap, useComments, useLocalStorage, useFetchUser, useUser };
