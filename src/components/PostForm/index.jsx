import { useEffect, useRef, useState } from "react";
import Editor from "../Editor";
import classes from "./style.module.css";
import { useOutletContext, useParams } from "react-router-dom";
import { useNavigate } from "react-router";
import { usePageTitle } from "../../hooks";
import PropTypes from "prop-types";
import Spinner from "../Spinner";
import ErrorModal from "../ErrorModal";

const getBlobs = async (bodyContents) => {
  const blobs = [];
  for (const op of bodyContents.ops) {
    if (!op.insert.image) continue;
    const url = op.insert.image.url;
    if (!isLocalUrl(url)) continue;
    const blob = await getBlobFromLocalUrl(url);
    blobs.push(blob);
  }
  return blobs;
};

const isLocalUrl = (url) => url.startsWith("blob:http://localhost");

const getBlobFromLocalUrl = (localUrl) => fetch(localUrl).then((r) => r.blob());

const createNewPost = async (formData) => {
  const auth = localStorage.getItem("auth");
  const url = import.meta.env.VITE_API_URL + "/posts";
  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: auth,
    },
    body: formData,
  });
  if (!res.ok) return null;
  const post = await res.json();
  return post;
};

const updatePost = async (formData, postId) => {
  const auth = localStorage.getItem("auth");
  const url = import.meta.env.VITE_API_URL + "/posts/" + postId;
  const res = await fetch(url, {
    method: "PATCH",
    headers: {
      Authorization: auth,
    },
    body: formData,
  });
  if (!res.ok) return null;
  const post = await res.json();
  return post;
};

const getFormData = async (title, bodyContents, isHidden) => {
  const formData = new FormData();
  formData.append("title", title);
  formData.append("isHidden", isHidden);
  const blobs = await getBlobs(bodyContents);
  for (const blob of blobs) {
    formData.append("blob", blob);
  }
  formData.append("body", JSON.stringify(bodyContents));
  return formData;
};

function SubmitFormButton({ isSending, isCreateButton }) {
  const buttonClassName = classes["create-button"];
  const initialText = isCreateButton ? "Create" : "Update";
  const savingText = isCreateButton ? "Creating" : "Updating";

  return (
    <button disabled={isSending} type="submit" className={buttonClassName}>
      {isSending ? (
        <span className={classes["saving-text-wrapper"]}>
          <Spinner className={classes.spinner} />
          {savingText}
        </span>
      ) : (
        initialText
      )}
    </button>
  );
}

SubmitFormButton.propTypes = {
  isSending: PropTypes.bool,
  isCreateButton: PropTypes.bool,
};

const PostForm = () => {
  const { postsMap, addPost, replacePost } = useOutletContext();
  const { id: postId } = useParams();
  const isExistingPost = !!postId;
  usePageTitle(isExistingPost ? "Update Post" : "New Post");
  const existingPost = isExistingPost ? postsMap.get(parseInt(postId)) : null;
  const initialTitle = isExistingPost ? existingPost.title : "";
  const initialBody = isExistingPost ? existingPost.body : "";
  const initialIsHidden = isExistingPost ? existingPost.isHidden : false;

  const [title, setTitle] = useState(initialTitle);
  const [isHidden, setIsHidden] = useState(initialIsHidden);
  const [submitError, setSubmitError] = useState(null);
  const [isSending, setIsSending] = useState(false);
  const quillRef = useRef(null);
  const errorModalRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!submitError) return;
    const modal = errorModalRef.current;
    modal.showModal();
    return () => {
      modal.close();
    };
  }, [submitError]);

  const handleTitleChange = (e) => setTitle(e.target.value.trimStart());
  const handleIsHiddenChange = (e) => setIsHidden(e.target.checked);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);
    const formData = await getFormData(
      title,
      quillRef.current.getContents(),
      isHidden
    );
    const genericErrorMessage = `Failed to ${isExistingPost ? "update" : "create"} post`;
    try {
      if (isExistingPost) {
        const updatedPost = await updatePost(formData, postId);
        if (updatedPost) {
          replacePost(updatedPost);
          navigate(`/posts/${postId}`);
        } else {
          throw new Error(genericErrorMessage);
        }
        return;
      }
      const newPost = await createNewPost(formData);
      if (newPost) {
        addPost(newPost);
        navigate(`/posts/${newPost.id}`);
      } else {
        throw new Error(genericErrorMessage);
      }
    } catch (err) {
      console.error(err);
      setSubmitError(err.message ?? genericErrorMessage);
    } finally {
      setIsSending(false);
    }
  };

  const handleErrorModalClose = () => {
    errorModalRef.current.close();
    setSubmitError(null);
  };

  const titleFieldId = "new-post-form-title";
  const bodyLabelId = "new-post-form-body";
  const publishFieldId = "new-post-form-publish";
  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <section className={classes.field}>
        <label htmlFor={titleFieldId}>Title</label>
        <textarea
          id={titleFieldId}
          onChange={handleTitleChange}
          value={title}
          minLength={1}
          required
          className={classes["title-input"]}
        />
      </section>
      <section className={classes.field}>
        <span id={bodyLabelId}>Body</span>
        <Editor
          labelledBy={bodyLabelId}
          initialContent={initialBody}
          ref={quillRef}
        />
      </section>
      <section className={classes["is-hidden-field"]}>
        <input
          type="checkbox"
          id={publishFieldId}
          onChange={handleIsHiddenChange}
          checked={isHidden}
        />
        <label htmlFor={publishFieldId}>Unpublish</label>
      </section>
      <>
        <SubmitFormButton
          isSending={isSending}
          isCreateButton={!isExistingPost}
        />
        {submitError && (
          <ErrorModal
            message={submitError}
            onClose={handleErrorModalClose}
            ref={errorModalRef}
          />
        )}
      </>
    </form>
  );
};

export default PostForm;
