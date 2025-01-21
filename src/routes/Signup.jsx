import { useState, useContext, useEffect } from "react";
import { Form, useNavigate, useActionData, redirect } from "react-router-dom";
import { Context as GlobalStateContext } from "../utils/GlobalStateContext.js";
import { env } from "../../config/config.js";
import styles from "./Logout.module.css";
import InputComp from "../components/InputComp.jsx";
import routes from "../routes.jsx";

export default function Signup() {
    const [info, setInfo] = useState("");
    const [isLogged, setIsLogged] = useContext(GlobalStateContext);
    const navigate = useNavigate();
    const status = useActionData();

    useEffect(() => {
        if (status) {
            if (status === 200) {
                setInfo("WELCOME TO THE JUNGLE, NEW APE!");
                setIsLogged(true);
                navigate("/");
                return;
            } else {
                setInfo("SOMETHING WENT WRONT, CANNOT REGISTER APE");
                setIsLogged(false);
                redirect("/logout");
                return;
            }
        }
    }, [status]);

    if (isLogged === true) {
        routes.navigate("/");
        return;
    }
    return (
        <>
            <div className={styles.container}>
                <Form method="post" action="/signup">
                    <div className={styles["container-inputs"]}>
                        {env.inputs.signup.map((input) => (
                            <InputComp
                                key={input[1]}
                                type={input[0]}
                                name={input[1]}
                                placeholder={input[2]}
                            />
                        ))}
                        <button className={styles.input} type="submit">
                            Create account
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
        repassword: data.get("repassword"),
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

    return response.status;
}
