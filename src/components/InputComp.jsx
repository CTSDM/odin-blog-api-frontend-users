import PropTypes from "prop-types";
import styles from "./InputComp.module.css";

function InputText({ type, name, placeholder, minLength, maxLength, pattern, handleOnChange }) {
    return (
        <div className={styles["input-container"]}>
            <input
                type={type}
                name={name}
                id={`input-${name}`}
                aria-label={name}
                placeholder=" "
                required
                minLength={minLength}
                maxLength={maxLength}
                pattern={pattern}
                onChange={handleOnChange}
                className={styles.input}
            />
            <label htmlFor={`input-${name}`} className={styles.placeholder}>
                <div>{placeholder}</div>
            </label>
        </div>
    );
}

InputText.propTypes = {
    type: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    minLength: PropTypes.number,
    maxLength: PropTypes.number,
    pattern: PropTypes.string,
    handleOnChange: PropTypes.func,
};

export default InputText;
