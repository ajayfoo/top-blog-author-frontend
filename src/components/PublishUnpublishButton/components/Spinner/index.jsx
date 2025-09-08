import PropTypes from "prop-types";
import classes from "./style.module.css";
function Spinner({ className = "" }) {
  return (
    <div
      role="alert"
      aria-busy={true}
      className={`${classes.spinner} ${className}`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className={classes.svg}
      >
        <g
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          className={classes["svg-g"]}
        >
          <path d="M12 3c4.97 0 9 4.03 9 9" transform="rotate(360 12 12)" />
          <path
            strokeOpacity="0.3"
            d="M12 3c4.97 0 9 4.03 9 9c0 4.97 -4.03 9 -9 9c-4.97 0 -9 -4.03 -9 -9c0 -4.97 4.03 -9 9 -9Z"
          />
        </g>
      </svg>
    </div>
  );
}

Spinner.propTypes = {
  className: PropTypes.string,
};

export default Spinner;
