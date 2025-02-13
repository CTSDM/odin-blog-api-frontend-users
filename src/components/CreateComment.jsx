import { useEffect } from "react";
import PropTypes from "prop-types";
import { Form, useActionData } from "react-router-dom";
import styles from "./CreateComment.module.css";
import requests from "../utils/requests";

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
                const responsePost = await requests.getPost(postId);
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
    return await requests.submitComment(submission);
};

CreateComment.propTypes = {
    postId: PropTypes.number.isRequired,
    setPost: PropTypes.func.isRequired,
};

export default CreateComment;
