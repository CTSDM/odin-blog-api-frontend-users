import { useEffect, useContext } from "react";
import { Context as GlobalContext } from "../utils/GlobalStateContext.js";
import { routes } from "../routes.jsx";

function Logout() {
    const [, setIsLogged, , setUsername] = useContext(GlobalContext);
    useEffect(() => {
        const controller = new AbortController();
        (async () => {
            const url = "http://localhost:5000/logout";
            try {
                const response = await fetch(url, {
                    mode: "cors",
                    method: "post",
                    credentials: "include",
                    signal: controller.signal,
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                if (response.error) {
                    console.log(response.error);
                }
                setIsLogged(false);
                setUsername(null);
                routes.navigate("/");
                return;
            } catch (err) {
                console.log(err);
            }
        })();
        return () => {
            controller.abort("Cancelled because of React StrictMode it gets called twice.");
        };
    }, [setIsLogged]);

    return;
}

export default Logout;
