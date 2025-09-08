import PropTypes from "prop-types";
import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import Spinner from "./components/Spinner";
import classes from "./style.module.css";

const PublishUnpublishButton = ({ post }) => {
  const { replacePost } = useOutletContext();
  const [loading, setIsLoading] = useState(false);
  const buttonLabel = post.isHidden ? "Publish" : "Unpublish";
  const handleClick = async (e) => {
    e.preventDefault();
    await toggleIsHidden();
  };
  const toggleIsHidden = async () => {
    const auth = localStorage.getItem("auth");
    const url =
      import.meta.env.VITE_API_URL + "/posts/" + post.id + "/isHidden";
    const body = JSON.stringify({ isHidden: !post.isHidden });
    try {
      setIsLoading(true);
      const res = await fetch(url, {
        method: "PATCH",
        headers: {
          Authorization: auth,
          "Content-Type": "application/json",
        },
        body,
      });
      if (res.ok) {
        const updatedPost = structuredClone(post);
        updatedPost.isHidden = !updatedPost.isHidden;
        replacePost(updatedPost);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <button
      className={loading ? classes["button-with-spinner"] : classes["button"]}
      disabled={loading}
      onClick={handleClick}
      type="button"
    >
      {loading ? <Spinner /> : buttonLabel}
    </button>
  );
};

PublishUnpublishButton.propTypes = {
  post: PropTypes.object,
};

export default PublishUnpublishButton;
