import PropTypes from "prop-types";

function DividerIcon({ className }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="2 7 11 1"
    >
      <path
        fillRule="evenodd"
        d="M2 7.5a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1h-10a.5.5 0 0 1-.5-.5"
        clipRule="evenodd"
      ></path>
    </svg>
  );
}

DividerIcon.propTypes = {
  className: PropTypes.string,
};

export default DividerIcon;
