import { useState, useContext, useEffect } from "react";
import { useNavigate, useActionData } from "react-router-dom";
import { Context as GlobalStateContext } from "../utils/GlobalStateContext.js";
import { env } from "../../config/config.js";
import ErrMsg from "../components/ErrMsg.jsx";
import { routes } from "../routes.jsx";
import { getLengthArrofArr } from "../utils/utils.js";
import styles from "./Signup.module.css";
import stylesShared from "../styles/form.module.css";
import FormCredentials from "../components/FormCredentials.jsx";

export default function Signup() {
    const [info, setInfo] = useState("");
    const [msgArr, setMsgArr] = useState([[], [], []]);
    const [isLogged, setIsLogged, , , refMessage] = useContext(GlobalStateContext);
    const navigate = useNavigate();
    const response = useActionData();

    useEffect(() => {
        if (!response) {
            refMessage.current = null;
        }
        if (response && response.status) {
            if (response.status === 200) {
                setInfo("WELCOME TO THE JUNGLE, NEW APE!");
                refMessage.current = "You have successfully created an account";
                navigate("/login");
                return;
            } else if (response.status >= 400) {
                setInfo("SOMETHING WENT WRONT, CANNOT REGISTER APE");
                setIsLogged(false);
                return;
            }
        }
    }, [response, navigate, refMessage, setIsLogged]);

    function handleSubmit(e) {
        let errCount = 0;
        errCount = errCount + getLengthArrofArr(msgArr);
        if (errCount > 0) {
            setInfo("THE FORM IS BEING VALIDATED ON THE FRONT END SIDE");
            e.preventDefault();
        }
    }

    if (isLogged === true) {
        routes.navigate("/");
        return;
    }

    return (
        <>
            <div className={stylesShared.container}>
                <div className={styles["container-information"]}>
                    <div className={styles.instructions}>
                        <div>
                            The username must have between {env.validation.users.username.minLength}{" "}
                            and {env.validation.users.username.maxLength} characters.
                        </div>
                        <div>
                            The password must have between {env.validation.users.password.minLength}{" "}
                            and {env.validation.users.password.maxLength} characters. It must
                            include at least one upper case letter, one lowe case letter, one number
                            and one special symbol.
                        </div>
                    </div>
                    {info ? (
                        <div className={styles.errors}>
                            <>
                                <div>{info}</div>
                                {response && response.status >= 400 ? (
                                    <ErrMsg
                                        messages={response.data.errMsg || [].concat(...msgArr)}
                                    />
                                ) : null}
                                {getLengthArrofArr(msgArr) ? (
                                    <ErrMsg messages={[].concat(...msgArr)} />
                                ) : null}
                            </>
                        </div>
                    ) : null}
                </div>
                <FormCredentials
                    inputs={env.inputs.signup}
                    msgArr={msgArr}
                    setMsgArr={setMsgArr}
                    handleSubmit={handleSubmit}
                    action={"/signup"}
                    validate={true}
                    buttonText="Create account"
                />
            </div>
        </>
    );
}

export const action = async ({ request }) => {
    const data = await request.formData();
    const submission = {
        username: data.get("username"),
        password: data.get("password"),
        rePassword: data.get("rePassword"),
    };

    const status = await submitSignup(submission);
    return status;
};

async function submitSignup(data) {
    const url = "http://localhost:5000/signup";
    const response = await fetch(url, {
        mode: "cors",
        credentials: "include",
        method: "post",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "http://localhost:5000",
        },
    });

    const json = await response.json();

    return { status: response.status, data: json };
}
