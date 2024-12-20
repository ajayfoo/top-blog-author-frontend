import PropTypes from "prop-types";

function HomeIcon({ className }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="4 3 16 18"
    >
      <path d="M6 19h3v-6h6v6h3v-9l-6-4.5L6 10zm-2 2V9l8-6l8 6v12h-7v-6h-2v6zm8-8.75"></path>
    </svg>
  );
}

HomeIcon.propTypes = {
  className: PropTypes.string,
};

export default HomeIcon;
