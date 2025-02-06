import { createBrowserRouter } from "react-router-dom";
import Root from "./routes/Root.jsx";
import ErrorComponent from "./components/ErrorComponent.jsx";
import GlobalContextProvider from "./utils/GlobalStateProvider.jsx";
import Login, { action as loginAction } from "./routes/Login.jsx";
import Logout from "./routes/Logout.jsx";
import Post, { loader as postLoader } from "./routes/Post.jsx";
import Signup, { action as signupAction } from "./routes/Signup.jsx";
import { action as createCommentAction } from "./components/CreateComment.jsx";

const routesConfig = [
    {
        path: "/",
        element: <GlobalContextProvider />,
        errorElement: <ErrorComponent />,
        children: [
            {
                path: "/",
                element: <Root />,
                errorElement: <ErrorComponent />,
            },
            {
                path: "/login",
                element: <Login />,
                errorElement: <ErrorComponent />,
                action: loginAction,
            },
            {
                path: "/logout",
                element: <Logout />,
                errorElement: <ErrorComponent />,
            },
            {
                path: "/posts/:postId",
                element: <Post />,
                errorElement: <ErrorComponent />,
                loader: postLoader,
                action: createCommentAction,
            },
            {
                path: "/signup",
                element: <Signup />,
                errorElement: <ErrorComponent />,
                action: signupAction,
            },
        ],
    },
];

const routes = createBrowserRouter(routesConfig);

export default routesConfig;
export { routes };
