import PropTypes from "prop-types";

function PlusIcon({ className }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="5 5 14 14"
    >
      <path fill="currentColor" d="M11 13H5v-2h6V5h2v6h6v2h-6v6h-2z"></path>
    </svg>
  );
}

PlusIcon.propTypes = {
  className: PropTypes.string,
};

export default PlusIcon;
