import PropTypes from "prop-types";
import styles from "./ButtonSubmit.module.css";

export default function ButtonSubmit({ text }) {
    return (
        <button type="submit" className={styles.input}>
            {text}
        </button>
    );
}

ButtonSubmit.propTypes = {
    text: PropTypes.string.isRequired,
};
