import { useState, useContext, useEffect } from "react";
import { useNavigate, useActionData, redirect } from "react-router-dom";
import { Context as GlobalStateContext } from "../utils/GlobalStateContext.js";
import FormCredentials from "../components/FormCredentials.jsx";
import { env } from "../../config/config.js";
import styles from "./Login.module.css";
import stylesShared from "../styles/form.module.css";

export default function Login() {
    const [info, setInfo] = useState("");
    const [isLogged, setIsLogged, , setUsername, refMessage] = useContext(GlobalStateContext);
    const navigate = useNavigate();
    const response = useActionData();

    useEffect(() => {
        if (isLogged) {
            navigate("/");
            return;
        }
        if (response) {
            if (response.status === 200) {
                setInfo("APE IS IN");
                setIsLogged(true);
                setUsername(response.username);
                navigate("/");
                return;
            } else {
                setInfo("YOU NOT APE");
                setIsLogged(false);
                redirect("/login");
                return;
            }
        }
    }, [response]);

    return (
        <>
            <div className={stylesShared.container}>
                <div className={styles.message}>{refMessage.current}</div>
                <div>
                    <FormCredentials
                        buttonText={"Sign in"}
                        inputs={env.inputs.login}
                        action={"/login"}
                        validate={false}
                    />
                    <div>{info}</div>
                </div>
            </div>
        </>
    );
}

export const action = async ({ request }) => {
    const data = await request.formData();
    const submission = {
        username: data.get("username"),
        password: data.get("password"),
    };

    const response = await submitLogin(submission);
    return response;
};

async function submitLogin(data) {
    const url = "http://localhost:5000/login";
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

    const userData = await response.json();
    return { status: response.status, ...userData };
}
