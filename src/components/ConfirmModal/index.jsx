import PropTypes from "prop-types";
import { forwardRef, useState } from "react";
import classes from "./style.module.css";
import Spinner from "../Spinner";

const ConfirmModal = forwardRef(function ConfirmModal(
  { message, onCancel, onConfirm },
  ref
) {
  const [isProcessing, setIsProcessing] = useState(false);
  const handleConfirmClick = async () => {
    try {
      setIsProcessing(true);
      await onConfirm();
    } finally {
      setIsProcessing(false);
    }
  };
  return (
    <dialog onClose={onCancel} ref={ref} className={classes["confirm-modal"]}>
      <form method="dialog">
        <p className={classes.message}>{message}</p>
        <div className={classes["action-buttons"]}>
          <button
            className={classes.cancel}
            type="button"
            onClick={onCancel}
            disabled={isProcessing}
          >
            Cancel
          </button>
          <button
            className={classes.confirm}
            type="button"
            onClick={handleConfirmClick}
            disabled={isProcessing}
          >
            {isProcessing ? <Spinner /> : "Confirm"}
          </button>
        </div>
      </form>
    </dialog>
  );
});

ConfirmModal.propTypes = {
  message: PropTypes.string,
  onCancel: PropTypes.func,
  onConfirm: PropTypes.func,
};

export default ConfirmModal;
