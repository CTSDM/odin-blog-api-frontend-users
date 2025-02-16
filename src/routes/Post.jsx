import PropTypes from "prop-types";
import { useContext, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { Context as GlobalStateContext } from "../utils/GlobalStateContext.js";
import Comment from "../components/Comment.jsx";
import CreateComment from "../components/CreateComment.jsx";
import requests from "../utils/requests.js";
import svgLiked from "../assets/favorite_24dp_E8EAED.svg";
import svgNotLiked from "../assets/favorite_border_24dp_E8EAED.svg";
import styles from "./Post.module.css";

export async function loader({ params }) {
    const postId = params.postId;
    const controller = new AbortController();
    const response = await requests.getPost(postId, controller);
    return response;
}

function isLiked(likesUserArr, username) {
    if (!username || likesUserArr.lengt === 0) return false;
    if (likesUserArr.includes(username)) {
        return true;
    } else {
        return false;
    }
}

function updateLikes(method, username, post) {
    if (method === "post") {
        post.likes.push(username);
    } else {
        const indexRemove = post.likes.indexOf(username);
        post.likes.splice(indexRemove, 1);
    }
}

export default function Post() {
    const responseLoader = useLoaderData();
    const [post, setPost] = useState(responseLoader.data);
    const [isLogged, , username] = useContext(GlobalStateContext);
    const [like, setLike] = useState(post && isLiked(post.likes, username));
    const [statusLike, setStatusLike] = useState(null);

    if (responseLoader.status >= 500) {
        return <div>{"Something went wrong on the server side!!!!!"}</div>;
    } else if (responseLoader.status === 404) {
        return <div>{"The post could not be found."}</div>;
    } else if (responseLoader.status >= 400) {
        return <div>{"You don't have access to view this post."}</div>;
    }

    async function handleSubmit() {
        setLike(!like);
        const method = like ? "delete" : "post";
        updateLikes(method, username, responseLoader.data);
        const response = await requests.submitLike(post.id, method);
        if (response.status !== 200 && response.status !== 404) {
            return setStatusLike(
                "Something went wrong on the server, please reload the page and try again.",
            );
        } else {
            setStatusLike(null);
        }
    }

    return (
        <div className={styles["container-post-comment"]}>
            <div className={styles.container}>
                <div className={styles.title}>{post.title}</div>
                <div className={styles.author}>{post.username}</div>
                <div className={styles.content}>{post.content}</div>
                {statusLike ? <div>{statusLike}</div> : null}
                <div>
                    {isLogged ? (
                        <button type="button" onClick={handleSubmit}>
                            {like ? (
                                <img
                                    src={svgLiked}
                                    alt="Heart symbol with solid color indicating that the post is liked."
                                />
                            ) : (
                                <img
                                    src={svgNotLiked}
                                    alt="Empty heart symbol indicated that the post has not been liked yet."
                                />
                            )}
                        </button>
                    ) : null}
                    <div>Like count: {post.likes.length}</div>
                </div>
            </div>
            {isLogged ? <CreateComment postId={post.id} setPost={setPost} /> : null}
            {post.comments.length ? (
                <>
                    <div className={styles["comments-container"]}>
                        <div className={styles["comments-header"]}>Comments section</div>
                        {post.comments.map((comment) => {
                            return (
                                <Comment
                                    key={comment.id}
                                    id={comment.id}
                                    content={comment.content}
                                    author={comment.username}
                                    profileSrcServer={comment.profileSrc}
                                    username={username}
                                    // we convert the date string into date Object
                                    createdTime={new Date(comment["created_time"])}
                                    setPost={setPost}
                                />
                            );
                        })}
                    </div>
                </>
            ) : (
                <div>There are no comments yet...!</div>
            )}
        </div>
    );
}

Post.propTypes = {
    params: PropTypes.object,
};
