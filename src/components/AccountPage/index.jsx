import { useRef } from "react";
import classes from "./style.module.css";
import ConfirmModal from "../ConfirmModal/index.jsx";
import { useUser } from "../../hooks.jsx";
import { Navigate, useNavigate } from "react-router-dom";
import Spinner from "../Spinner/index.jsx";
import { UserStatus } from "../../utils.js";

function AccountPage() {
  const { user } = useUser();
  const confirmModalRef = useRef(null);
  const navigate = useNavigate();

  if (user.status === UserStatus.CHECKING) {
    return <Spinner className={classes.spinner} />;
  }
  if (user.status === UserStatus.UNAUTHORIZED) {
    return <Navigate to="/auth/login" />;
  }

  const handleConfirmModalCancel = () => {
    confirmModalRef.current.close();
  };

  const handleConfirmModalConfirm = () => {
    localStorage.removeItem("auth");
    navigate("/auth/login");
  };

  const showConfirmModal = () => {
    confirmModalRef.current.showModal();
  };

  return (
    <>
      <main className={classes["account-page"]}>
        <div className={classes["user-logout"]}>
          <p className={classes.username}>{user.username}</p>
          <button
            className={classes["logout-button"]}
            type="button"
            onClick={showConfirmModal}
          >
            Logout
          </button>
        </div>
      </main>
      <ConfirmModal
        onCancel={handleConfirmModalCancel}
        onConfirm={handleConfirmModalConfirm}
        message="Are you sure you want to logout?"
        ref={confirmModalRef}
      />
    </>
  );
}

export default AccountPage;
