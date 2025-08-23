import { NavLink } from "react-router-dom";
import classes from "./style.module.css";
import HomeIcon from "../Icons/HomeIcon.jsx";
import PersonIcon from "../Icons/PersonIcon.jsx";

function MainNav() {
  return (
    <nav className={classes["main-nav"]}>
      <div className={classes["nav-items"]}>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? classes.active : "")}
        >
          <HomeIcon className={classes.icon} />
          Home
        </NavLink>
        <NavLink
          to="/account"
          className={({ isActive }) => (isActive ? classes.active : "")}
        >
          <PersonIcon className={classes.icon} />
          Account
        </NavLink>
      </div>
    </nav>
  );
}

export default MainNav;
