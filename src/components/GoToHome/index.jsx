import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import classes from "./style.module.css";
import HomeIcon from "../Icons/HomeIcon";

function GoToHome({ className = "" }) {
  const rootClassName = `${classes["go-to-home"]} ${className}`;
  return (
    <article className={rootClassName}>
      <Link to="/">
        <HomeIcon className={classes.icon} />
        Go to Home
      </Link>
    </article>
  );
}

GoToHome.propTypes = {
  className: PropTypes.string,
};

export default GoToHome;
