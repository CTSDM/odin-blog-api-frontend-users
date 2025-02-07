import PropTypes from "prop-types";
import { useContext } from "react";
import { useLoaderData } from "react-router-dom";
import { Context as GlobalStateContext } from "../utils/GlobalStateContext.js";
import Comment from "../components/Comment.jsx";
import CreateComment from "../components/CreateComment.jsx";
import styles from "./Post.module.css";

export async function loader({ params }) {
    const postId = params.postId;
    const response = await getPost(postId);
    return response;
}

function Post() {
    const response = useLoaderData();
    const [isLogged] = useContext(GlobalStateContext);
    if (response.status !== 200) return <div>{"Something went wrong on the server side..."}</div>;
    return (
        <div className={styles["container-post-comment"]}>
            <div className={styles.container}>
                <div className={styles.title}>{response.data.title}</div>
                <div className={styles.author}>{response.data.username}</div>
                <div className={styles.content}>{response.data.content}</div>
            </div>
            {isLogged ? <CreateComment postId={response.data.id} /> : null}
            {response.data.comments.length ? (
                <div className={styles["comments-container"]}>
                    {response.data.comments.map((comment) => {
                        return (
                            <Comment
                                key={comment.id}
                                content={comment.content}
                                author={comment.username}
                                // we convert the date string into date Object
                                createdTime={new Date(comment["created_time"])}
                            />
                        );
                    })}
                </div>
            ) : (
                <div>There are no comments yet...!</div>
            )}
        </div>
    );
}

Post.propTypes = {
    params: PropTypes.object,
};

async function getPost(id) {
    const url = `http://localhost:5000/posts/${id}`;
    const response = await fetch(url, {
        credentials: "include",
        method: "get",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "http://localhost:5000",
        },
    });
    if (!response.ok) {
        return { status: response.status };
    }
    const json = await response.json();
    return { status: response.status, data: json };
}

export default Post;
