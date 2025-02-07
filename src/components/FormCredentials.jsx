import { Form } from "react-router-dom";
import { env } from "../../config/config.js";
import InputComp from "./InputComp.jsx";
import ButtonSubmit from "./ButtonSubmit.jsx";
import utils from "../utils/utils.js";
import PropTypes from "prop-types";
import styles from "./FormCredentials.module.css";

export default function FormCredentials({
    inputs,
    msgArr,
    setMsgArr,
    action,
    validate,
    handleSubmit,
    buttonText,
}) {
    return (
        <Form
            className={styles.form}
            inputs={inputs}
            method="post"
            action={action}
            onSubmit={handleSubmit}
            name="form"
        >
            <div className={styles["container-inputs"]}>
                {inputs.map((input) => {
                    const field = input[1];
                    return (
                        <InputComp
                            key={input[1]}
                            type={input[0]}
                            name={input[1]}
                            placeholder={input[2]}
                            minLength={
                                validate ? +env.validation.users[input[3]].minLength : undefined
                            }
                            maxLength={
                                validate ? +env.validation.users[input[3]].maxLength : undefined
                            }
                            handleOnChange={
                                validate
                                    ? utils.curriedHandler(utils.checkFunctions[field])(
                                          setMsgArr,
                                          msgArr,
                                      )
                                    : () => {}
                            }
                        />
                    );
                })}
                <ButtonSubmit text={buttonText} />
            </div>
        </Form>
    );
}

FormCredentials.propTypes = {
    inputs: PropTypes.array.isRequired,
    msgArr: PropTypes.array,
    setMsgArr: PropTypes.func,
    action: PropTypes.string.isRequired,
    validate: PropTypes.bool.isRequired,
    handleSubmit: PropTypes.func,
    buttonText: PropTypes.string.isRequired,
};
