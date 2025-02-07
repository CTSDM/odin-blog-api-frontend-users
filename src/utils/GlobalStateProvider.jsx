import { useState, useEffect, useRef } from "react";
import { Outlet } from "react-router-dom";
import PropTypes from "prop-types";
import styles from "./GlobalStateProvider.module.css";

import { Context } from "./GlobalStateContext.js";
import NavigationBar from "../components/NavigationBar.jsx";

function GlobalContextProvider() {
    const [isLoading, setIsLoading] = useState(true);
    const [isLogged, setIsLogged] = useState(false);
    const [username, setUsername] = useState(null);
    const message = useRef();
    const ms = 500;

    useEffect(() => {
        const controller = new AbortController();
        (async () => {
            setIsLoading(true);
            const url = "http://localhost:5000/login";
            try {
                const response = await fetch(url, {
                    signal: controller.signal,
                    mode: "cors",
                    credentials: "include",
                    method: "get",
                });
                await sleep(ms);
                if (response.status === 200) {
                    setIsLogged(true);
                    const json = await response.json();
                    setUsername(json.username);
                } else {
                    setIsLogged(false);
                    setUsername(null);
                }
                setIsLoading(false);
            } catch (err) {
                console.log(err);
            }
        })();
        return () => {
            controller.abort("Cancelled because of React StrictMode it gets called twice.");
        };
    }, []);

    return (
        <Context.Provider value={[isLogged, setIsLogged, username, setUsername, message]}>
            {isLoading ? (
                <div>loading</div>
            ) : (
                <>
                    <header>
                        <NavigationBar isLogged={isLogged} username={username} />
                    </header>
                    <div className={styles.container}>
                        <Outlet />
                    </div>
                </>
            )}
        </Context.Provider>
    );
}

GlobalContextProvider.propTypes = {
    children: PropTypes.element,
};

// function to mimic rount trip form the server
async function sleep(time) {
    return new Promise((resolve) => {
        setTimeout(resolve, time);
    });
}

export default GlobalContextProvider;
