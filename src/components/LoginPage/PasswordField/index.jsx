import classes from "./style.module.css";
import PropTypes from "prop-types";
import ClosedEyeIcon from "../../Icons/ClosedEyeIcon";
import OpenEyeIcon from "../../Icons/OpenEyeIcon";
import { useEffect, useRef, useState } from "react";

function PasswordField({
  value,
  onChange,
  disabled,
  validationMsg,
  formSubmitAttempted = false,
}) {
  const ref = useRef(null);
  const [edited, setEdited] = useState(false);
  const [showValidationMsg, setShowValidationMsg] = useState(false);
  const [isHidden, setIsHidden] = useState(true);

  useEffect(() => {
    if (!validationMsg) {
      ref.current.setCustomValidity("");
      return;
    }
    ref.current.setCustomValidity(validationMsg);
  }, [validationMsg]);

  const handleBlur = () => {
    if (!edited) return;
    setShowValidationMsg(validationMsg ? true : false);
  };

  const handleChange = (e) => {
    setEdited(true);
    onChange(e);
  };

  const handleEyeClick = () => {
    setIsHidden(!isHidden);
  };

  const eyeIcon = isHidden ? (
    <ClosedEyeIcon className={classes.eye} />
  ) : (
    <OpenEyeIcon className={classes.eye} />
  );

  const dispalyValidationMessage =
    showValidationMsg || (formSubmitAttempted && validationMsg);

  const eyeButtonLabel = (isHidden ? "show" : "hide") + " password";
  const type = isHidden ? "password" : "text";
  const id = "sign-up-page-password";
  const fieldClass = `${classes.field} ${disabled ? classes.disabled : ""}`;
  return (
    <section className={fieldClass}>
      <label htmlFor={id}>Password</label>
      <div
        className={`${classes["input-wrapper"]} ${dispalyValidationMessage ? classes["error-border-color"] : ""}`}
      >
        <input
          ref={ref}
          disabled={disabled}
          id={id}
          type={type}
          required
          autoComplete="current-password"
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <button
          aria-label={eyeButtonLabel}
          onClick={handleEyeClick}
          type="button"
          className={classes["eye-button"]}
        >
          {eyeIcon}
        </button>
      </div>
      {dispalyValidationMessage && (
        <span className={classes.error}>{validationMsg}</span>
      )}
    </section>
  );
}

PasswordField.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  validationMsg: PropTypes.string,
  formSubmitAttempted: PropTypes.bool,
};

export default PasswordField;
