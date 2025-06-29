import classes from "./style.module.css";
import PostForm from "../PostForm";

const NewPostPage = () => {
  return (
    <main className={classes.page}>
      <PostForm />
    </main>
  );
};

export default NewPostPage;
