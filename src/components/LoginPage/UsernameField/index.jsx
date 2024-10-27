import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import classes from "./style.module.css";

function UsernameField({
  value,
  onChange,
  disabled,
  validationMsg,
  formSubmitAttempted = false,
}) {
  const ref = useRef(null);
  const [edited, setEdited] = useState(false);
  const [showValidationMsg, setShowValidationMsg] = useState(false);

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

  const dispalyValidationMessage =
    showValidationMsg || (formSubmitAttempted && validationMsg);

  const fieldClass = `${classes.field} ${disabled ? classes.disabled : ""}`;
  const id = "sign-up-page-username";
  return (
    <section className={fieldClass}>
      <label htmlFor={id}>Username</label>
      <input
        className={
          dispalyValidationMessage ? classes["error-border-color"] : ""
        }
        ref={ref}
        disabled={disabled}
        id={id}
        type="text"
        required
        autoComplete="username"
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      {dispalyValidationMessage && (
        <span className={classes.error}>{validationMsg}</span>
      )}
    </section>
  );
}

UsernameField.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  validationMsg: PropTypes.string,
  formSubmitAttempted: PropTypes.bool,
};

export default UsernameField;
