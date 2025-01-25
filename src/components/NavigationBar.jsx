import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import { elementsNavBar } from "../../config/config.js";
import styles from "./NavigationBar.module.css";
import navBarImg from "../assets/delta-sigma.svg";

function NavigationBar({ isLogged, username }) {
    const entries = getHrefsInfo(elementsNavBar, isLogged);
    return (
        <div role={"nav-container"} className={styles.bar}>
            <div>
                <img src={navBarImg} alt="company logo" />
            </div>
            <div className={styles.subcontainer}>
                <span>Welcome {username}</span>
                <nav>
                    {entries.map((entry) => (
                        <NavLink to={entry[1]} key={entry[1]}>
                            {entry[0]}
                        </NavLink>
                    ))}
                </nav>
            </div>
        </div>
    );
}

function getHrefsInfo(obj, isLogged) {
    const stateObj = isLogged ? obj.loggedIn : obj.loggedOut;
    const entries = Object.entries(stateObj);
    return entries;
}

NavigationBar.propTypes = {
    isLogged: PropTypes.bool.isRequired,
    username: PropTypes.string,
};

export default NavigationBar;
