import PropTypes from "prop-types";

function ItalicIcon({ className }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="6 4 12 14"
    >
      <path d="M10 4v3h2.21l-3.42 8H6v3h8v-3h-2.21l3.42-8H18V4z"></path>
    </svg>
  );
}

ItalicIcon.propTypes = {
  className: PropTypes.string,
};

export default ItalicIcon;
