const elementsNavBar = {
    loggedIn: { Logout: "/logout" },
    loggedOut: { Signup: "/signup", Login: "/login" },
};

const env = {
    inputs: {
        login: [
            ["text", "username", import.meta.env.VITE_USERNAME_PLACEHOLDER],
            ["password", "password", import.meta.env.VITE_PASSWORD_PLACEHOLDER],
        ],
        signup: [
            ["text", "username", import.meta.env.VITE_USERNAME_PLACEHOLDER],
            ["password", "password", import.meta.env.VITE_PASSWORD_PLACEHOLDER],
            ["password", "rePassword", import.meta.env.VITE_PASSWORD_PLACEHOLDER],
        ],
    },
};

export { env, elementsNavBar };
