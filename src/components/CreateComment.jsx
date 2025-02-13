import { useEffect } from "react";
import PropTypes from "prop-types";
import { Form, useActionData } from "react-router-dom";
import styles from "./CreateComment.module.css";

function CreateComment({ postId, setPost }) {
    const response = useActionData();

    if (response && response.status >= 500) {
        console.log("something went wrong on the server side");
    } else if (response && response.status >= 400) {
        console.log("you are not authorized to leave a message");
    } else if (response && response.status === 200) {
        // i believe this is kinda tricky
        // i need to first show the user comment as the user submits it
        // and then i need to re render the page when the response comes back
        // the id of the one being updated should be something along the lines 'provisional'
    }

    useEffect(() => {
        if (response) {
            (async () => {
                const responsePost = await getPost(postId);
                const post = responsePost.data;
                setPost(post);
            })();
        }
    }, [response, postId]);

    return (
        <div className={styles.container}>
            <div>Write a new comment:</div>
            <Form className={styles.form} method="POST" action={`/posts/${postId}`}>
                <textarea rows="4" cols="60" name="content"></textarea>
                <input type="text" hidden name="postId" defaultValue={postId} />
                <button type="submit">Submit new comment</button>
            </Form>
        </div>
    );
}

export const action = async ({ request }) => {
    const data = await request.formData();
    const submission = {
        content: data.get("content"),
        postId: data.get("postId"),
    };
    const form = document.querySelector("form");
    form.reset();

    return await submitComment(submission);
};

async function submitComment(data) {
    const url = "http://localhost:5000/comments";
    const response = await fetch(url, {
        mode: "cors",
        credentials: "include",
        method: "post",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "http://localhost:5000",
        },
    });

    return { status: response.status };
}

CreateComment.propTypes = {
    postId: PropTypes.number.isRequired,
    setPost: PropTypes.func.isRequired,
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

export default CreateComment;
