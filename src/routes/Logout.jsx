import { useEffect, useContext } from "react";
import { Context as GlobalContext } from "../utils/GlobalStateContext.js";
import { routes } from "../routes.jsx";
import requests from "../utils/requests.js";

function Logout() {
    const [, setIsLogged, , setUsername] = useContext(GlobalContext);
    useEffect(() => {
        const controller = new AbortController();
        (async () => {
            try {
                const response = await requests.submitLogout(controller);
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
