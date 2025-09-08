import PropTypes from "prop-types";
import { useOutletContext } from "react-router-dom";

const PublishUnpublishButton = ({ post }) => {
  const { replacePost } = useOutletContext();
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
    }
  };
  return (
    <button onClick={handleClick} type="button">
      {buttonLabel}
    </button>
  );
};

PublishUnpublishButton.propTypes = {
  post: PropTypes.object,
};

export default PublishUnpublishButton;
