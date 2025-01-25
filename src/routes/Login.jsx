import { useState, useContext, useEffect } from "react";
import { Form, useNavigate, useActionData, redirect } from "react-router-dom";
import { Context as GlobalStateContext } from "../utils/GlobalStateContext.js";
import { env } from "../../config/config.js";
import styles from "./Login.module.css";
import InputComp from "../components/InputComp.jsx";

export default function Login() {
    const [info, setInfo] = useState("");
    const [isLogged, setIsLogged, , setUsername] = useContext(GlobalStateContext);
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
                setUsername(response.data.username);
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
            <div className={styles.container}>
                <Form method="post" action="/login">
                    <div className={styles["container-inputs"]}>
                        {env.inputs.login.map((input) => (
                            <InputComp
                                key={input[1]}
                                type={input[0]}
                                name={input[1]}
                                placeholder={input[2]}
                            />
                        ))}
                        <button className={styles.input} type="submit">
                            Login
                        </button>
                    </div>
                </Form>
                <div>{info}</div>
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

    const userData = response.json();
    return { status: response.status, data: userData };
}
