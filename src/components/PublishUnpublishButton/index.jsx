import PropTypes from "prop-types";

const PublishUnpublishButton = ({ isHidden, onClick }) => {
  const buttonLabel = isHidden ? "Publish" : "Unpublish";
  const handleClick = async (e) => {
    e.preventDefault();
    await onClick();
  };
  return (
    <button onClick={handleClick} type="button">
      {buttonLabel}
    </button>
  );
};

PublishUnpublishButton.propTypes = {
  isHidden: PropTypes.bool,
  onClick: PropTypes.func,
};

export default PublishUnpublishButton;
