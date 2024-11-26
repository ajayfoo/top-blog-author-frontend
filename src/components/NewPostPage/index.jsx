import { useRef, useState } from "react";
import Editor from "../Editor";
import classes from "./style.module.css";

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
  const postId = await res.text();
  return postId;
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

const getBlobs = async (bodyContents) => {
  const blobs = [];
  for (const op of bodyContents.ops) {
    if (!op.insert.image) continue;
    const localUrl = op.insert.image.url;
    const blob = await getBlobFromLocalUrl(localUrl);
    blobs.push(blob);
  }
  return blobs;
};

const getBlobFromLocalUrl = (localUrl) => fetch(localUrl).then((r) => r.blob());

const NewPostForm = () => {
  const [title, setTitle] = useState("");
  const [isHidden, setIsHidden] = useState(true);
  const quillRef = useRef(null);

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleIsHiddenChange = (e) => setIsHidden(e.target.checked);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = await getFormData(
      title,
      quillRef.current.getContents(),
      isHidden
    );
    try {
      const newPostId = await createNewPost(formData);
      if (!newPostId) throw new Error("Failed to create post");
    } catch (err) {
      console.error(err);
    }
  };

  const titleFieldId = "new-post-form-title";
  const bodyLabelId = "new-post-form-body";
  const isHiddenFieldId = "new-post-form-is-hidden";
  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <section className={classes.field}>
        <label htmlFor={titleFieldId}>Title</label>
        <textarea
          id={titleFieldId}
          onChange={handleTitleChange}
          value={title}
          required
          className={classes["title-input"]}
        />
      </section>
      <section className={classes.field}>
        <span id={bodyLabelId}>Body</span>
        <Editor labelledBy={bodyLabelId} ref={quillRef} />
      </section>
      <section className={classes["is-hidden-field"]}>
        <input
          type="checkbox"
          id={isHiddenFieldId}
          onChange={handleIsHiddenChange}
          checked={isHidden}
        />
        <label htmlFor={isHiddenFieldId}>Is hidden</label>
      </section>
      <button className={classes["create-button"]}>Create</button>
    </form>
  );
};

const NewPostPage = () => {
  return (
    <main className={classes.page}>
      <NewPostForm />
    </main>
  );
};

export default NewPostPage;
