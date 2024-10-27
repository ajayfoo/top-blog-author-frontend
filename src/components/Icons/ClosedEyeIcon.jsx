import PropTypes from "prop-types";

function ClosedEyeIcon({ className }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="1 9 22 7.5"
    >
      <path
        fill="currentColor"
        d="M12 17.5c-3.8 0-7.2-2.1-8.8-5.5H1c1.7 4.4 6 7.5 11 7.5s9.3-3.1 11-7.5h-2.2c-1.6 3.4-5 5.5-8.8 5.5"
      ></path>
    </svg>
  );
}

ClosedEyeIcon.propTypes = {
  className: PropTypes.string,
};

export default ClosedEyeIcon;
