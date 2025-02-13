import PropTypes from "prop-types";
import { useContext, useState } from "react";
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
    const [post, setPost] = useState(response.data);
    const [isLogged, , username] = useContext(GlobalStateContext);

    if (response.status >= 500) {
        return <div>{"Something went wrong on the server side!"}</div>;
    } else if (response.status == 404) {
        return <div>{"The post could not be found."}</div>;
    } else if (response.status >= 400) {
        return <div>{"You don't have access to view this post."}</div>;
    }

    return (
        <div className={styles["container-post-comment"]}>
            <div className={styles.container}>
                <div className={styles.title}>{post.title}</div>
                <div className={styles.author}>{post.username}</div>
                <div className={styles.content}>{post.content}</div>
            </div>
            {isLogged ? <CreateComment postId={post.id} setPost={setPost} /> : null}
            {post.comments.length ? (
                <div className={styles["comments-container"]}>
                    {post.comments.map((comment) => {
                        return (
                            <Comment
                                key={comment.id}
                                id={comment.id}
                                content={comment.content}
                                author={comment.username}
                                username={username}
                                // we convert the date string into date Object
                                createdTime={new Date(comment["created_time"])}
                                setPost={setPost}
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
