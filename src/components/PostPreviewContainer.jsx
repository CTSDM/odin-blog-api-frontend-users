import { useState, useEffect } from "react";
import PostPreview from "./PostPreview.jsx";
import styles from "./PostPreviewContainer.module.css";
import requests from "../utils/requests.js";

function PostPreviewContainer() {
    const [postInfo, setPostInfo] = useState(null);

    useEffect(() => {
        const controller = new AbortController();
        (async () => {
            try {
                const response = await requests.getAllPosts(controller);
                setPostInfo(response);
            } catch (err) {
                console.log(err);
            }
        })();

        return () => {
            controller.abort("Cancelled because of React StrictMode it gets called twice.");
        };
    }, []);

    if (postInfo === null) return <div>{"Loading..."}</div>;
    if (postInfo.status !== 200)
        return <div>{"The posts couldn't be retrieved. Try again, please."}</div>;
    if (postInfo.data.length === 0)
        return <div>{"Whoops, it looks like there are no entries yet..."}</div>;

    return (
        <div className={styles.container}>
            {postInfo.data.map((post) => {
                return (
                    <PostPreview
                        key={post.id}
                        title={post.title}
                        content={post.content}
                        username={post.username}
                        route={"/posts"}
                        id={post.id}
                    />
                );
            })}
        </div>
    );
}

export default PostPreviewContainer;
