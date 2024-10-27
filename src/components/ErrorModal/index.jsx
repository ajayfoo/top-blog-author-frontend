import { forwardRef } from "react";
import classes from "./style.module.css";
import PropTypes from "prop-types";
import ErrorIcon from "../Icons/ErrorIcon";

const ErrorModal = forwardRef(function ErrorModal({ message, onClose }, ref) {
  return (
    <dialog onClose={onClose} className={classes["error-modal"]} ref={ref}>
      <div className={classes.info}>
        <ErrorIcon className={classes["error-icon"]} />
        <p className={classes.message}>{message}</p>
      </div>
      <button onClick={onClose} type="button">
        OK
      </button>
    </dialog>
  );
});

ErrorModal.propTypes = {
  message: PropTypes.string,
  onClose: PropTypes.func,
};

export default ErrorModal;
