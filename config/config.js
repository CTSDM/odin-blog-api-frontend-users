const elementsNavBar = {
    loggedIn: { Home: "/", Logout: "/logout" },
    loggedOut: { Home: "/", Signup: "/signup", Login: "/login" },
};

const env = {
    inputs: {
        login: [
            ["text", "username", import.meta.env.VITE_USERNAME_PLACEHOLDER, "username"],
            ["password", "password", import.meta.env.VITE_PASSWORD_PLACEHOLDER, "password"],
        ],
        signup: [
            ["text", "username", import.meta.env.VITE_USERNAME_PLACEHOLDER, "username"],
            ["password", "password", import.meta.env.VITE_PASSWORD_PLACEHOLDER, "password"],
            ["password", "rePassword", import.meta.env.VITE_PASSWORD_PLACEHOLDER, "password"],
        ],
    },
    validation: {
        users: {
            username: {
                minLength: import.meta.env.VITE_USERNAME_MIN_LENGTH,
                maxLength: import.meta.env.VITE_USERNAME_MAX_LENGTH,
                // It must start with a letter
                regex: import.meta.env.VITE_USERNAME_REGEX,
                message: import.meta.env.VITE_USERNAME_REGEX_MESSAGE,
            },
            password: {
                minLength: import.meta.env.VITE_PASSWORD_MIN_LENGTH,
                maxLength: import.meta.env.VITE_PASSWORD_MAX_LENGTH,
                // At least one letter, one number and one special character
                regex: import.meta.env.VITE_PASSWORD_REGEX,
                message: import.meta.env.VITE_PASSWORD_REGEX_MESSAGE,
            },
        },
    },
    server_url: "http://localhost:5000",
};

export { env, elementsNavBar };
