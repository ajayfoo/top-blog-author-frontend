import { useRef, useState } from "react";
import Editor from "../Editor";

const createNewPost = async (title, body, isHidden) => {
  const auth = localStorage.getItem("auth");
  const url = import.meta.env.VITE_API_URL + "/posts";
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: auth,
    },
    body: JSON.stringify({ title, body, isHidden }),
  });
  if (!res.ok) return null;
  const postId = await res.text();
  return postId;
};

const NewPostForm = () => {
  const [title, setTitle] = useState("");
  const [isHidden, setIsHidden] = useState(true);
  const quillRef = useRef(null);

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleBodyChange = (e) => setBody(e.target.value);
  const handleIsHiddenChange = (e) => setIsHidden(e.target.checked);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = JSON.stringify(quillRef.current.getContents());
    try {
      const newPostId = createNewPost(title, body, isHidden);
      if (!newPostId) throw new Error("Failed to create post");
    } catch (err) {
      console.error(err);
    }
  };

  const titleFieldId = "new-post-form-title";
  const bodyFieldId = "new-post-form-body";
  const isHiddenFieldId = "new-post-form-is-hidden";
  return (
    <form onSubmit={handleSubmit}>
      <section className="field">
        <label htmlFor={titleFieldId}>Title</label>
        <textarea
          id={titleFieldId}
          onChange={handleTitleChange}
          value={title}
          required
        />
      </section>
      <Editor ref={quillRef} />
      <section className="field">
        <label htmlFor={isHiddenFieldId}>Is Hidden</label>
        <input
          type="checkbox"
          id={isHiddenFieldId}
          onChange={handleIsHiddenChange}
          checked={isHidden}
        />
      </section>
      <button>Create</button>
    </form>
  );
};

const NewPostPage = () => {
  return (
    <main>
      <NewPostForm />
    </main>
  );
};

export default NewPostPage;
