import { useState, useEffect } from "react";
import PostPreview from "./PostPreview.jsx";
import styles from "./PostPreviewContainer.module.css";

function PostPreviewContainer() {
    const [postInfo, setPostInfo] = useState(null);

    useEffect(() => {
        const controller = new AbortController();
        (async () => {
            const response = await getAllPosts(controller);
            setPostInfo(response);
        })();

        return () => controller.abort();
    }, []);

    if (postInfo === null) return <div>{"Loading..."}</div>;
    if (postInfo.status !== 200)
        return (
            <div>{"The posts couldn't be retrieved. Try again, please."}</div>
        );
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

async function getAllPosts(controller) {
    const url = "http://localhost:5000/posts";
    const response = await fetch(url, {
        signal: controller.signal,
        credentials: "include",
        method: "get",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "http://localhost:5000",
        },
    });
    const json = await response.json();
    return { status: response.status, data: json };
}

export default PostPreviewContainer;
