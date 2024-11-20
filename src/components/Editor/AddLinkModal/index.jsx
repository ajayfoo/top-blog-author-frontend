import { useEffect, useRef } from "react";
import classes from "./style.module.css";
import PropTypes from "prop-types";

const AddLinkModal = ({
  show,
  onClose,
  onSubmit,
  linkText,
  onLinkTextChange,
  link,
  onLinkChange,
}) => {
  const ref = useRef(null);
  useEffect(() => {
    const modal = ref.current;
    if (!show) {
      modal.close();
      return;
    }
    modal.showModal();
  }, [show]);

  const linkTextFieldId = "add-link-modal-link-text-field";
  const linkFieldId = "add-link-modal-link-field";

  return (
    <dialog onClose={onClose} ref={ref}>
      <div className={classes.field}>
        <label htmlFor={linkTextFieldId}>Text</label>
        <input
          type="text"
          id={linkTextFieldId}
          value={linkText}
          onChange={onLinkTextChange}
        />
      </div>
      <div className={classes.field}>
        <label htmlFor={linkFieldId}>Full URL</label>
        <input
          type="text"
          id={linkFieldId}
          value={link}
          onChange={onLinkChange}
        />
      </div>
      <button type="button" onClick={onClose}>
        Close
      </button>
      <button type="button" onClick={onSubmit}>
        Submit
      </button>
    </dialog>
  );
};

AddLinkModal.propTypes = {
  show: PropTypes.bool,
  onClose: PropTypes.func,
  onSubmit: PropTypes.func,
  linkText: PropTypes.string,
  onLinkTextChange: PropTypes.func,
  link: PropTypes.string,
  onLinkChange: PropTypes.func,
};

export default AddLinkModal;
