import PropTypes from "prop-types";

function BlockquoteIcon({ className }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="3 3.25 18 17.5"
    >
      <path d="M3.75 3.25A.75.75 0 0 0 3 4v16a.75.75 0 0 0 .75.75a.75.75 0 0 0 .75-.75V4a.75.75 0 0 0-.75-.75m4.5 2A.75.75 0 0 0 7.5 6a.75.75 0 0 0 .75.75h12A.75.75 0 0 0 21 6a.75.75 0 0 0-.75-.75Zm0 6a.75.75 0 0 0-.75.75a.75.75 0 0 0 .75.75h12A.75.75 0 0 0 21 12a.75.75 0 0 0-.75-.75Zm0 6a.75.75 0 0 0-.75.75a.75.75 0 0 0 .75.75h8.25a.75.75 0 0 0 .75-.75a.75.75 0 0 0-.75-.75Z"></path>
    </svg>
  );
}

BlockquoteIcon.propTypes = {
  className: PropTypes.string,
};

export default BlockquoteIcon;
