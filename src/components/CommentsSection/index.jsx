import { useComments } from "../../hooks";
import Comment from "../Comment";
import classes from "./style.module.css";
import { useParams } from "react-router-dom";

function CommentsSection() {
  const { id: postId } = useParams();
  const [comments, setComments] = useComments(postId);
  const handleDeleteComment = (id) => {
    setComments(comments.filter((c) => c.id !== id));
  };
  return (
    <div className={classes.comments}>
      <h2 className={classes.heading}>Comments</h2>
      {comments && (
        <div className={classes["comment-items"]}>
          {comments.map((c) => (
            <Comment
              key={c.id}
              comment={c}
              onDeleteComment={handleDeleteComment}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default CommentsSection;
