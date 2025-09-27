import PropTypes from "prop-types";
import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import Spinner from "./components/Spinner";
import classes from "./style.module.css";
import { useEffect } from "react";
import { useRef } from "react";
import ErrorModal from "../ErrorModal";

const PublishUnpublishButton = ({ post }) => {
  const { replacePost } = useOutletContext();
  const [loading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const errorModalRef = useRef(null);
  const buttonLabel = post.isHidden ? "Publish" : "Unpublish";

  useEffect(() => {
    if (!submitError) return;
    const modal = errorModalRef.current;
    modal.showModal();
    return () => {
      modal.close();
    };
  }, [submitError]);

  const handleClick = async (e) => {
    e.preventDefault();
    await toggleIsHidden();
  };

  const handleErrorModalClose = (e) => {
    errorModalRef.current.close();
    e.preventDefault();
    setSubmitError(null);
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
      } else {
        throw new Error("Something went wrong");
      }
    } catch (err) {
      console.error(err);
      setSubmitError(
        `Failed to ${post.isHidden ? "publish" : "unpublish"} post`
      );
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <button
        className={loading ? classes["button-with-spinner"] : classes["button"]}
        disabled={loading}
        onClick={handleClick}
        type="button"
      >
        {loading ? <Spinner /> : buttonLabel}
      </button>
      {submitError && (
        <ErrorModal
          message={submitError}
          onClose={handleErrorModalClose}
          ref={errorModalRef}
        />
      )}
    </>
  );
};

PublishUnpublishButton.propTypes = {
  post: PropTypes.object,
};

export default PublishUnpublishButton;
