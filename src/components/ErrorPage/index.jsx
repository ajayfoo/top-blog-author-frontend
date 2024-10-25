import { useRouteError } from "react-router-dom";
import GoToHome from "../GoToHome";
import classes from "./style.module.css";
import ErrorIcon from "../Icons/ErrorIcon";

function ErrorPage() {
  const error = useRouteError();
  return (
    <main className={classes["error-page"]}>
      <article className={classes["error"]}>
        <header className={classes.header}>
          <ErrorIcon className={classes["error-icon"]} />
          <h1 className={classes.heading}>{error.statusText}</h1>
        </header>
        <GoToHome className={classes["go-to-home"]} />
      </article>
    </main>
  );
}

export default ErrorPage;
