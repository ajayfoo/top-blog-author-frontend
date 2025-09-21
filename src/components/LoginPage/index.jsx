import classes from "./style.module.css";
import Spinner from "../Spinner";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import ErrorModal from "../ErrorModal";
import UsernameField from "./UsernameField";
import PasswordField from "./PasswordField";
import { usePageTitle } from "../../../../top-blog-viewer-frontend/src/hooks";

const sendLoginRequest = async (username, password) => {
  const url = import.meta.env.VITE_API_URL + "/auth/login";
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
    mode: "cors",
  });
  return res;
};

function LoginForm() {
  const [username, setUsername] = useState("");
  const [usernameValidationMsg, setUsernameValidationMsg] =
    useState("Required");

  const [password, setPassword] = useState("");
  const [passwordValidationMsg, setPasswordValidationMsg] =
    useState("Required");

  const [isSending, setIsSending] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isInvalidCred, setIsInvalidCred] = useState(false);
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const errorModalRef = useRef(null);

  useEffect(() => {
    if (!error) return;
    errorModalRef.current.showModal();
  }, [error]);

  const handleErrorModalClose = () => {
    errorModalRef.current.close();
    setError(null);
  };

  const handleUsernameChange = (e) => {
    const newValue = e.target.value;
    setUsername(newValue);
    if (newValue.length === 0) {
      setUsernameValidationMsg("Required");
      return;
    }
    setUsernameValidationMsg(null);
  };

  const handlePasswordChange = (e) => {
    const newValue = e.target.value;
    setPassword(newValue);
    if (newValue.length === 0) {
      setPasswordValidationMsg("Required");
      return;
    }
    setPasswordValidationMsg(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitAttempted(true);
    if (!e.target.checkValidity()) return;
    try {
      setIsSending(true);
      setIsInvalidCred(false);
      const res = await sendLoginRequest(username, password);
      if (res.status === 401) {
        setIsInvalidCred(true);
        return;
      }
      if (!res.ok) {
        throw new Error(res.status + ": " + res.statusText);
      }
      const jwt = await res.text();
      const auth = "Bearer " + jwt;
      localStorage.setItem("auth", auth);
      navigate("/");
    } catch (err) {
      console.error(err);
      setError("Something went wrong");
    } finally {
      setIsSending(false);
    }
  };
  return (
    <form noValidate={true} onSubmit={handleSubmit} className={classes.form}>
      <UsernameField
        disabled={isSending}
        value={username}
        onChange={handleUsernameChange}
        validationMsg={usernameValidationMsg}
        formSubmitAttempted={submitAttempted}
      />
      <PasswordField
        disabled={isSending}
        value={password}
        onChange={handlePasswordChange}
        validationMsg={passwordValidationMsg}
        formSubmitAttempted={submitAttempted}
      />
      {isInvalidCred && (
        <span className={classes["invalid-cred-msg"]}>
          Invalid username or password
        </span>
      )}
      <div className={classes["action-buttons"]}>
        <button disabled={isSending} className={classes.login}>
          {isSending ? <Spinner className={classes["spinner"]} /> : "Login"}
        </button>
      </div>
      {error && (
        <ErrorModal
          message={error}
          onClose={handleErrorModalClose}
          ref={errorModalRef}
        />
      )}
    </form>
  );
}

function LoginPage() {
  usePageTitle("Login");
  return (
    <main className={classes.main}>
      <div className={classes.wrapper}>
        <LoginForm />
      </div>
    </main>
  );
}

export default LoginPage;
