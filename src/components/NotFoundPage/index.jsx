import GoToHome from "../GoToHome";
import classes from "./style.module.css";
import ErrorIcon from "../Icons/ErrorIcon";

function NotFoundPage() {
  return (
    <main className={classes["error-page"]}>
      <article className={classes["error"]}>
        <header className={classes.header}>
          <ErrorIcon className={classes["error-icon"]} />
          <h1 className={classes.heading}>Page not found</h1>
        </header>
        <GoToHome className={classes["go-to-home"]} />
      </article>
    </main>
  );
}

export default NotFoundPage;
