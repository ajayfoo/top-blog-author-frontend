import { useRouteError } from "react-router-dom";
import GoToHome from "../GoToHome";
import classes from "./style.module.css";
import ErrorIcon from "../Icons/ErrorIcon";
import { usePageTitle } from "../../hooks";

function ErrorPage() {
  usePageTitle("Error");
  const error = useRouteError();
  return (
    <main className={classes["error-page"]}>
      <article className={classes["error"]}>
        <header className={classes.header}>
          <ErrorIcon className={classes["error-icon"]} />
          <h1 className={classes.heading}>{JSON.stringify(error)}</h1>
        </header>
        <GoToHome className={classes["go-to-home"]} />
      </article>
    </main>
  );
}

export default ErrorPage;
